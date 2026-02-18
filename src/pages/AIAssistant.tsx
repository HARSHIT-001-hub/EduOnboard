import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, User, AlertTriangle, TrendingUp, Lightbulb, RefreshCw } from "lucide-react";
import { initialChatMessages, aiResponses } from "@/models/mockData";
import type { ChatMessage } from "@/models/types";

const suggestions = [
  "What documents do I need?",
  "Explain fee structure",
  "Show my deadlines",
  "How to register courses?",
  "What's my onboarding status?",
  "Hostel details",
];

function findResponse(query: string): { content: string; confidence: number } {
  const q = query.toLowerCase();
  if (q.includes("fee") || q.includes("payment") || q.includes("cost")) return aiResponses.fee;
  if (q.includes("doc") || q.includes("certificate") || q.includes("upload")) return aiResponses.document;
  if (q.includes("hostel") || q.includes("room") || q.includes("accommodation")) return aiResponses.hostel;
  if (q.includes("deadline") || q.includes("due") || q.includes("date") || q.includes("overdue")) return aiResponses.deadline;
  if (q.includes("course") || q.includes("register") || q.includes("subject")) return aiResponses.course;
  if (q.includes("status") || q.includes("progress") || q.includes("complete")) return aiResponses.status;
  return {
    content: "I understand your query. For detailed assistance on this topic, I recommend:\n\n1. **Check the Student Handbook** available in the admin portal\n2. **Visit the Admin Office** (Block A, Room 101) during working hours\n3. **Email:** helpdesk@engineering.edu\n\nWould you like me to help you escalate this to a human advisor? 🙋",
    confidence: 0.72,
  };
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text?: string) => {
    const content = text || input.trim();
    if (!content) return;

    const userMsg: ChatMessage = {
      id: `u${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const delay = 800 + Math.random() * 1000;
    setTimeout(() => {
      const resp = findResponse(content);
      const aiMsg: ChatMessage = {
        id: `a${Date.now()}`,
        role: "assistant",
        content: resp.content,
        timestamp: new Date().toISOString(),
        confidence: resp.confidence,
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, delay);
  };

  const handleEscalate = () => {
    const msg: ChatMessage = {
      id: `sys${Date.now()}`,
      role: "assistant",
      content: "✅ **Escalation Submitted!**\n\nYour query has been escalated to a human advisor. You will receive a response within **2 business hours** via email.\n\n📧 Notification sent to: arjun.sharma@engineering.edu\n🎫 Ticket ID: ESC-2024-089\n\n*A human advisor will review and respond shortly.*",
      timestamp: new Date().toISOString(),
      confidence: 1.0,
      isEscalated: true,
    };
    setMessages(prev => [...prev, msg]);
  };

  const formatContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />')
      .replace(/•/g, '&bull;');
  };

  const formatTime = (iso: string) => {
    return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-9rem)] max-w-3xl">
      {/* Header info */}
      <div className="flex items-center gap-3 p-4 glass-card rounded-xl mb-4 border border-border">
        <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow animate-float">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold text-foreground flex items-center gap-2">
            EduBot AI Assistant
            <span className="badge-success">● Online</span>
          </div>
          <div className="text-xs text-muted-foreground">Powered by rule-based AI + human escalation</div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-lg">
          <TrendingUp className="w-3.5 h-3.5 text-primary" />
          <span>Avg. confidence: 94%</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === "assistant" ? "bg-gradient-brand text-white shadow-glow" : "bg-muted text-foreground"
              }`}>
                {msg.role === "assistant" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              {/* Bubble */}
              <div className={`flex-1 max-w-[85%] space-y-1.5 ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gradient-brand text-white rounded-tr-sm"
                    : msg.isEscalated
                    ? "bg-success/10 border border-success/30 text-foreground rounded-tl-sm"
                    : "glass-card border border-border text-foreground rounded-tl-sm"
                }`}>
                  <div dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }} />
                </div>
                <div className={`flex items-center gap-2 text-[10px] text-muted-foreground ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <span>{formatTime(msg.timestamp)}</span>
                  {msg.confidence !== undefined && msg.role === "assistant" && (
                    <span className="badge-primary">
                      <TrendingUp className="w-2.5 h-2.5" />
                      {Math.round(msg.confidence * 100)}% confidence
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center shadow-glow">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="glass-card border border-border px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-primary animate-spin" />
              <span className="text-xs text-muted-foreground">EduBot is thinking...</span>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 2 && (
        <div className="mb-3">
          <div className="flex items-center gap-1.5 mb-2 text-xs text-muted-foreground">
            <Lightbulb className="w-3.5 h-3.5" />
            Suggested questions:
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map(s => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="px-3 py-1.5 rounded-full text-xs bg-muted hover:bg-primary/20 hover:text-primary border border-border transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="glass-card border border-border rounded-xl p-3 flex flex-col gap-2">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder="Ask EduBot anything about onboarding..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground resize-none outline-none min-h-[40px] max-h-[120px]"
            rows={1}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isTyping}
            className="p-2.5 rounded-xl bg-gradient-brand text-white btn-glow disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[10px] text-muted-foreground">Press Enter to send · Shift+Enter for new line</div>
          <button
            onClick={handleEscalate}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-medium bg-warning/10 text-yellow-400 border border-warning/30 hover:bg-warning/20 transition-colors"
          >
            <AlertTriangle className="w-3 h-3" />
            Escalate to Human
          </button>
        </div>
      </div>
    </div>
  );
}
