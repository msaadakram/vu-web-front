"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, User, Send, Trash2, ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Markdown } from "@/components/Markdown";
import type { ChatMessage } from "@/lib/chat";
import { sendChatMessageStream } from "@/lib/chat";

const SUGGESTIONS = [
  "What programs does VU offer?",
  "How do I apply for admission?",
  "What is the fee structure for BSCS?",
  "Show me study resources",
  "What is VU LMS and how do I use it?",
  "Tell me about MBA programs",
];

export default function AiChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback((smooth = true) => {
    const el = viewportRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "instant" });
  }, []);

  useEffect(() => {
    if (streaming) {
      scrollToBottom(false);
    }
  }, [messages, streaming, scrollToBottom]);

  useEffect(() => {
    if (!streaming && messages.length > 0) scrollToBottom(true);
  }, [messages, streaming, scrollToBottom]);

  const handleScroll = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 80);
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
          if (last?.role === "assistant") last.content += token;
          return next;
        });
      },
      onDone: () => setStreaming(false),
      onError: () => {
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last?.role === "assistant" && !last.content)
            last.content = "Sorry, I couldn't process that right now. Please try again.";
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
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
  };

  const clearChat = () => {
    setMessages([]);
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <div className="fixed inset-x-0 top-16 lg:top-[72px] bottom-0 flex flex-col bg-white/60 backdrop-blur">
      <div className="mx-auto w-full max-w-4xl flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-[#1c3557]/8 bg-white/80 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#4eafc4] to-[#1c3557] flex items-center justify-center shadow-sm">
              <Sparkles className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-white" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-400 rounded-full border-2 border-white" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-[#1c3557] leading-tight">VirtualU AI</h1>
              <p className="text-[11px] sm:text-xs text-[#64788f] leading-tight">Ask me anything about VU</p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium text-[#64788f] hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}
        </div>

        {/* Messages */}
        <div className="relative flex-1 min-h-0">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 py-8 sm:py-12 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#4eafc4]/15 to-[#1c3557]/10 flex items-center justify-center mb-4 sm:mb-5">
                <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-[#4eafc4]" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-[#1c3557] mb-1.5">How can I help you?</h2>
              <p className="text-sm text-[#64788f] mb-6 sm:mb-8 max-w-md px-2">
                Ask me anything about Virtual University of Pakistan — programs, admission, courses, fee structure, study resources, and more.
              </p>
              <div className="flex flex-wrap gap-2 justify-center max-w-lg px-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setInput(s);
                      setTimeout(() => inputRef.current?.focus(), 50);
                    }}
                    className="px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-white text-[#4eafc4] border border-[#4eafc4]/20 hover:bg-[#4eafc4]/8 hover:border-[#4eafc4]/40 transition-all shadow-sm"
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
                className="h-full overflow-y-auto scroll-smooth px-3 sm:px-6 py-3 sm:py-4"
                style={{ scrollbarWidth: "thin", scrollbarColor: "#e8edf2 transparent" }}
              >
                <div className="space-y-3 sm:space-y-4 max-w-3xl mx-auto">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex gap-2 sm:gap-3",
                        msg.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {msg.role === "assistant" && (
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#4eafc4] to-[#1c3557] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                          <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[88%] sm:max-w-[80%] rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm leading-relaxed",
                          msg.role === "user"
                            ? "bg-gradient-to-r from-[#4eafc4] to-[#2a8aa3] text-white rounded-tr-sm shadow-sm"
                            : "bg-white text-[#1c3557] rounded-tl-sm shadow-sm border border-[#1c3557]/6"
                        )}
                      >
                        {msg.role === "user" ? (
                          <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                        ) : streaming && i === messages.length - 1 ? (
                          <span className="whitespace-pre-wrap break-words">{msg.content}</span>
                        ) : (
                          <Markdown content={msg.content} />
                        )}
                        {streaming && i === messages.length - 1 && msg.role === "assistant" && (
                          <span className="inline-block w-[3px] h-[14px] sm:h-[15px] bg-[#4eafc4] ml-0.5 animate-pulse align-text-bottom" />
                        )}
                      </div>
                      {msg.role === "user" && (
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#e8edf2] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                          <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#64788f]" />
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="h-3 sm:h-4" />
                </div>
              </div>

              <AnimatePresence>
                {showScrollBtn && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => scrollToBottom(true)}
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-lg border border-[#1c3557]/10 flex items-center justify-center text-[#64788f] hover:text-[#4eafc4] hover:border-[#4eafc4]/30 transition-all"
                  >
                    <ChevronDown className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" />
                  </motion.button>
                )}
              </AnimatePresence>
            </>
          )}
        </div>

        {/* Input */}
        <div className="px-3 sm:px-6 py-3 sm:py-4 border-t border-[#1c3557]/8 bg-white/80 shrink-0">
          <div className="flex items-end gap-2 sm:gap-3 max-w-3xl mx-auto">
            <textarea
              ref={inputRef}
              value={input}
              onChange={autoResize}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about VU..."
              rows={1}
              disabled={streaming}
              className="flex-1 min-h-[44px] sm:min-h-[52px] max-h-[140px] sm:max-h-[160px] px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#f0f7fa] border-none text-sm text-[#1c3557] placeholder:text-[#64788f]/50 outline-none focus:ring-2 focus:ring-[#4eafc4]/25 transition-all resize-none"
              style={{ scrollbarWidth: "none" }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || streaming}
              className="w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#4eafc4] to-[#2a8aa3] text-white flex items-center justify-center shrink-0 disabled:opacity-35 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-[#4eafc4]/30 active:scale-95"
              aria-label="Send"
            >
              {streaming ? (
                <span className="block w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]" />
              )}
            </button>
          </div>
          <p className="text-[10px] sm:text-[11px] text-[#64788f]/40 text-center mt-2 sm:mt-2.5 max-w-3xl mx-auto">
            AI responses are generated by AI and may be inaccurate. Verify important information from official VU sources.
          </p>
        </div>
      </div>
    </div>
  );
}
