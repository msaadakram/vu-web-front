export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type StreamCallbacks = {
  onToken: (token: string) => void;
  onDone: () => void;
  onError: (error: Error) => void;
};

export async function sendChatMessageStream(
  message: string,
  history: ChatMessage[],
  { onToken, onDone, onError }: StreamCallbacks,
  signal?: AbortSignal
): Promise<void> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
      signal,
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      throw new Error(data?.message || `Chat request failed: ${res.status}`);
    }

    const reader = res.body?.getReader();
    if (!reader) throw new Error("Response body is not readable");

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith("data: ")) continue;
        const data = trimmed.slice(6);

        try {
          const parsed = JSON.parse(data);
          if (parsed.done) {
            onDone();
            return;
          }
          if (parsed.error) {
            onError(new Error(parsed.error));
            return;
          }
          if (parsed.content) {
            onToken(parsed.content);
          }
        } catch {
          // skip malformed
        }
      }
    }

    onDone();
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") return;
    onError(err instanceof Error ? err : new Error(String(err)));
  }
}
