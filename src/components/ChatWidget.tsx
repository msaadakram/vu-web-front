"use client";

import { useState, useRef, useEffect, useCallback, lazy, Suspense } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Send, X, Bot, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/lib/chat";
import { sendChatMessageStream } from "@/lib/chat";

// react-markdown + remark-gfm (~46 KB) only needs to load when a bot message
// is actually rendered. Lazy-importing it here keeps the markdown parser out
// of the shared /layout chunk so it doesn't block first paint on every page.
const Markdown = lazy(async () => {
  const { Markdown: M } = await import("@/components/Markdown");
  return { default: M };
});

const SUGGESTIONS = [
  "What programs does VU offer?",
  "How do I apply for admission?",
  "What is the fee structure for BSCS?",
  "Show me study resources",
];

export function ChatWidget() {
  const pathname = usePathname();
  if (pathname === "/ai-chat") return null;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback((smooth = true) => {
    const el = viewportRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "instant" });
    }
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom(false);
      }, 200);
    }
  }, [open, scrollToBottom]);

  useEffect(() => {
    if (!streaming) scrollToBottom(true);
  }, [messages, streaming, scrollToBottom]);

  const handleScroll = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const dist = el.scrollHeight - el.scrollTop - el.clientHeight;
    setShowScrollBtn(dist > 80);
  }, []);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || streaming) return;
    setInput("");

    const userMsg: ChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setStreaming(true);

    const assistantMsg: ChatMessage = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMsg]);

    const history = messages.map(({ role, content }) => ({ role, content }));

    await sendChatMessageStream(text, history, {
      onToken: (token) => {
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last && last.role === "assistant") {
            last.content += token;
          }
          return next;
        });
      },
      onDone: () => setStreaming(false),
      onError: () => {
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last && last.role === "assistant" && !last.content) {
            last.content = "Sorry, I couldn't process that right now. Please try again.";
          }
          return next;
        });
        setStreaming(false);
      },
    });
  }, [input, streaming, messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-shadow duration-300",
          open ? "hidden" : "flex",
          "bg-gradient-to-br from-[#4eafc4] to-[#2a8aa3] hover:shadow-[0_8px_32px_rgba(78,175,196,0.45)]"
        )}
        aria-label="Open chat"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 4 }}
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:bottom-5 sm:right-5 z-50 w-auto sm:w-[400px] sm:max-w-[calc(100vw-2.5rem)] h-[calc(100vh-7rem)] sm:h-[600px] sm:max-h-[calc(100vh-6rem)] bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-[#1c3557]/10 flex flex-col overflow-hidden"
            style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.18)" }}
          >
            <div className="flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-[#4eafc4] to-[#2a8aa3] text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                  <Bot className="w-[18px] h-[18px]" />
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#2a8aa3]" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">VirtualU AI</p>
                  <p className="text-[10px] text-white/70 leading-tight flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" />
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <X className="w-[18px] h-[18px]" />
              </button>
            </div>

            <div className="relative flex-1 flex flex-col min-h-0">
              {messages.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4eafc4]/15 to-[#1c3557]/10 flex items-center justify-center mb-4">
                    <Bot className="w-8 h-8 text-[#4eafc4]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#1c3557] mb-1">How can I help you?</h3>
                  <p className="text-xs text-[#64788f] mb-6 max-w-[260px]">
                    Ask me anything about VU programs, admission, courses, fee structure, or study resources.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setInput(s);
                          setTimeout(() => inputRef.current?.focus(), 50);
                        }}
                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#f0f7fa] text-[#4eafc4] border border-[#4eafc4]/15 hover:bg-[#4eafc4]/10 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div
                    ref={viewportRef}
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto scroll-smooth"
                    style={{ scrollbarWidth: "thin", scrollbarColor: "#e8edf2 transparent" }}
                  >
                    <div ref={scrollRef} className="px-4 py-4 space-y-3">
                      {messages.map((msg, i) => (
                        <div
                          key={i}
                          className={cn(
                            "flex gap-2.5",
                            msg.role === "user" ? "justify-end" : "justify-start"
                          )}
                        >
                          {msg.role === "assistant" && (
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#4eafc4] to-[#1c3557] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                              <Bot className="w-3.5 h-3.5 text-white" />
                            </div>
                          )}
                          <div
                            className={cn(
                              "max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed break-words",
                              msg.role === "user"
                                ? "bg-gradient-to-r from-[#4eafc4] to-[#2a8aa3] text-white rounded-tr-sm shadow-sm"
                                : "bg-white text-[#1c3557] rounded-tl-sm shadow-sm border border-[#1c3557]/6"
                            )}
                          >
                            {msg.role === "user" ? (
                              <p className="whitespace-pre-wrap">{msg.content}</p>
                            ) : streaming && i === messages.length - 1 ? (
                              <span className="whitespace-pre-wrap">{msg.content}</span>
                            ) : (
                              <Suspense fallback={<span className="whitespace-pre-wrap">{msg.content}</span>}>
                                <Markdown content={msg.content} />
                              </Suspense>
                            )}
                            {streaming &&
                              i === messages.length - 1 &&
                              msg.role === "assistant" && (
                                <span className="inline-block w-[3px] h-[14px] bg-[#4eafc4] ml-0.5 animate-pulse align-text-bottom" />
                              )}
                          </div>
                          {msg.role === "user" && (
                            <div className="w-7 h-7 rounded-full bg-[#e8edf2] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                              <User className="w-3.5 h-3.5 text-[#64788f]" />
                            </div>
                          )}
                        </div>
                      ))}
                      <div className="h-2" />
                    </div>
                  </div>

                  <AnimatePresence>
                    {showScrollBtn && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => scrollToBottom(true)}
                        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-lg border border-[#1c3557]/10 flex items-center justify-center text-[#64788f] hover:text-[#4eafc4] hover:border-[#4eafc4]/30 transition-colors"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>

            <div className="px-3 sm:px-4 py-3 border-t border-[#1c3557]/8 bg-white/70 backdrop-blur shrink-0">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={autoResize}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything..."
                  rows={1}
                  disabled={streaming}
                  className="flex-1 min-h-[44px] max-h-[120px] px-4 py-3 rounded-2xl bg-[#f0f7fa] border border-transparent text-sm text-[#1c3557] placeholder:text-[#64788f]/50 outline-none focus:ring-2 focus:ring-[#4eafc4]/25 focus:bg-white transition-all resize-none"
                  style={{ scrollbarWidth: "none" }}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || streaming}
                  className="w-[44px] h-[44px] rounded-2xl bg-gradient-to-r from-[#4eafc4] to-[#2a8aa3] text-white flex items-center justify-center shrink-0 disabled:opacity-35 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-[#4eafc4]/30 active:scale-95"
                  aria-label="Send"
                >
                  {streaming ? (
                    <span className="block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-[18px] h-[18px]" />
                  )}
                </button>
              </div>
              <p className="text-[10px] text-[#64788f]/40 text-center mt-1.5">
                AI responses may be inaccurate. Verify important information.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
