"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { soundSynth } from "@/lib/sound-synth";
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ArrowUpRight,
  Shield,
  RefreshCw,
} from "lucide-react";

interface ChatCitation {
  source_id: string;
  title: string;
  category: string;
  url: string;
}

interface ChatMessage {
  id: string;
  sender: "user" | "twin";
  text: string;
  citations?: ChatCitation[];
  timestamp: string;
}

const SUGGESTED_QUESTIONS = [
  "How does Hyperion orchestrate autonomous agents?",
  "What is your RAG triad evaluation grading?",
  "Explain the Azure zero-trust container topology.",
  "How do you lead a 12-engineer squad?",
];

export function ArchitectTwinDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-welcome",
      sender: "twin",
      text: "Greetings. I am Rajkamal B Gowda's Architect Twin, directly grounded in 18 production AI systems, technical architecture blueprints, and squad delivery rituals. Ask me about multi-agent orchestration, Azure MLOps pipelines, latency budgets, or squad leadership.",
      citations: [
        {
          source_id: "portfolio-overview",
          title: "Rajkamal B Gowda Architect Profile",
          category: "Profile",
          url: "/#about",
        },
      ],
      timestamp: "Just now",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  const handleToggle = () => {
    soundSynth.playClick();
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isStreaming) return;

    soundSynth.playPacketTransmit();
    setInput("");

    const userMsgId = `user-${Date.now()}`;
    const twinMsgId = `twin-${Date.now()}`;

    const newMessages: ChatMessage[] = [
      ...messages,
      {
        id: userMsgId,
        sender: "user",
        text: query,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
      {
        id: twinMsgId,
        sender: "twin",
        text: "",
        citations: [],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ];

    setMessages(newMessages);
    setIsStreaming(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";
      const response = await fetch(`${apiUrl}/api/twin/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: query,
          conversation_history: messages.slice(-4).map((m) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          })),
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Twin response failed");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let accumulatedText = "";
      let citations: ChatCitation[] = [];

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = line.replace("data: ", "").trim();
          if (payload === "[DONE]") break;

          try {
            const data = JSON.parse(payload);
            const token = data.token || data.content;
            if (token) {
              accumulatedText += token;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === twinMsgId ? { ...m, text: accumulatedText } : m
                )
              );
            }
            if (data.citations && data.citations.length > 0) {
              citations = data.citations;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === twinMsgId ? { ...m, citations } : m
                )
              );
            }
          } catch {
            // Non-JSON SSE line
          }
        }
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === twinMsgId
            ? {
                ...m,
                text: "My neural link experienced an interruption connecting to the Azure gateway. In summary: Rajkamal specializes in end-to-end AI systems, multi-agent orchestration, and high-concurrency Python microservices on Azure.",
              }
            : m
        )
      );
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <>
      {/* Floating Bottom-Right Chrome Orb Button */}
      <div className="fixed bottom-6 right-6 z-40 pointer-events-auto">
        <button
          onClick={handleToggle}
          className="relative group p-1 rounded-full bg-gradient-to-tr from-silver-300 via-white to-silver-100 border border-silver-300 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Toggle Architect Twin AI Assistant"
        >
          {/* Subtle Iridescent Aura Ring */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-iris-cyan via-iris-lilac to-iris-peach opacity-40 blur-sm group-hover:opacity-80 transition-opacity animate-spin-slow" />

          {/* Orb Core */}
          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden bg-porcelain flex items-center justify-center border border-white">
            <Image
              src="/assets/portrait/avatar-portrait.png"
              alt="Architect Twin"
              width={56}
              height={56}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Online Radar Status Dot */}
          <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </span>
        </button>

        {/* Small floating pill preview when closed */}
        {!isOpen && (
          <div className="hidden md:flex absolute right-16 top-3 items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-silver-300 text-[10px] font-mono text-graphite-900 shadow-md whitespace-nowrap pointer-events-none group-hover:block transition-all">
            <Sparkles className="w-3 h-3 text-signal" />
            <span>TALK TO ARCHITECT TWIN</span>
          </div>
        )}
      </div>

      {/* Slide-out Chat Panel Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end pointer-events-auto selection:bg-silver-300">
          {/* Backdrop overlay */}
          <div
            className="absolute inset-0 bg-graphite-900/20 backdrop-blur-xs transition-opacity"
            onClick={handleToggle}
          />

          {/* Sliding Panel Window */}
          <div className="relative w-full max-w-md h-full bg-white/95 backdrop-blur-xl border-l border-silver-100 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="px-5 py-4 border-b border-silver-100 flex items-center justify-between bg-pearl/40">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-silver-300 bg-porcelain">
                  <Image
                    src="/assets/portrait/avatar-portrait.png"
                    alt="Architect Twin"
                    width={36}
                    height={36}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-bold text-sm text-graphite-900">
                      Architect Twin
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-signal/10 text-signal font-mono text-[9px] font-semibold">
                      v2.4 RAG
                    </span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[10px] text-graphite-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Grounded in Azure & Portfolio Specs</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setMessages([messages[0]]);
                    soundSynth.playClick();
                  }}
                  className="p-1.5 rounded-lg text-graphite-600 hover:text-graphite-900 hover:bg-silver-100 transition-colors"
                  title="Reset Conversation"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleToggle}
                  className="p-1.5 rounded-lg text-graphite-600 hover:text-graphite-900 hover:bg-silver-100 transition-colors"
                  title="Close Drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation Messages Viewport */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    {msg.sender === "twin" ? (
                      <>
                        <Bot className="w-3 h-3 text-signal" />
                        <span className="font-mono text-[9px] uppercase tracking-wider text-graphite-600">
                          ARCHITECT TWIN
                        </span>
                      </>
                    ) : (
                      <>
                        <User className="w-3 h-3 text-graphite-600" />
                        <span className="font-mono text-[9px] uppercase tracking-wider text-graphite-600">
                          YOU
                        </span>
                      </>
                    )}
                    <span className="font-mono text-[9px] text-graphite-400">• {msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-[88%] p-3.5 rounded-2xl text-xs leading-relaxed font-body ${
                      msg.sender === "user"
                        ? "bg-graphite-900 text-white rounded-br-xs shadow-sm"
                        : "bg-pearl/80 text-graphite-900 border border-silver-100 rounded-bl-xs shadow-xs"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text || (isStreaming ? "Thinking..." : "")}</p>

                    {/* Source Citation Chips */}
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-silver-300/40 space-y-1">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-graphite-600 block">
                          Verified Citations:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.citations.map((c, idx) => (
                            <Link
                              key={idx}
                              href={c.url}
                              onClick={handleToggle}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white border border-silver-300 hover:border-signal text-[10px] font-mono text-graphite-900 transition-colors shadow-xs"
                            >
                              <span>{c.title}</span>
                              <ArrowUpRight className="w-2.5 h-2.5 text-signal" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts Shelf */}
            <div className="p-3 bg-pearl/40 border-t border-silver-100">
              <span className="font-mono text-[9px] text-graphite-600 uppercase tracking-widest block mb-2 px-1">
                Suggested Architect Inquiries:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    disabled={isStreaming}
                    onClick={() => handleSendMessage(q)}
                    className="px-2.5 py-1 rounded-full bg-white border border-silver-100 hover:border-silver-300 text-[10px] font-mono text-graphite-600 hover:text-graphite-900 text-left transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-silver-100 bg-white">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  disabled={isStreaming}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about systems, models, or squad..."
                  className="flex-1 bg-pearl/50 border border-silver-100 rounded-xl px-3.5 py-2 text-xs font-body text-graphite-900 placeholder:text-graphite-400 focus:outline-none focus:border-signal focus:bg-white transition-colors"
                />
                <button
                  type="submit"
                  disabled={isStreaming || !input.trim()}
                  className="p-2 rounded-xl bg-graphite-900 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="mt-2 flex items-center justify-between text-[9px] font-mono text-graphite-600">
                <span className="flex items-center gap-1">
                  <Shield className="w-2.5 h-2.5 text-emerald-500" />
                  <span>Strict anti-hallucination ground truth</span>
                </span>
                <span>ESC to close</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
