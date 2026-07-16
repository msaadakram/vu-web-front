export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ChatResponse = {
  status: string;
  data: { reply: string };
};

export async function sendChatMessage(
  message: string,
  history: ChatMessage[]
): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });

  const data: ChatResponse = await res.json();

  if (!res.ok) {
    throw new Error(
      (data as unknown as { message?: string })?.message ||
        "Chat request failed"
    );
  }

  return data.data.reply;
}
