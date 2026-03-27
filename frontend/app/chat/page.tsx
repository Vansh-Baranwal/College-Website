"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState<{role: 'ai'|'user', content: string}[]>([
    { role: 'ai', content: "Hello! I'm your IIT Delhi Campus AI Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) {
      handleSend(q);
      window.history.replaceState({}, '', '/chat');
    }
  }, []);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    const userMsg = text;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput("");
    setIsLoading(true);

    try {
      const { apiChat } = await import("@/lib/api");
      const reply = await apiChat(userMsg);
      setMessages(prev => [...prev, { role: 'ai', content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', content: `I'm sorry, I couldn't process your request right now. Please try again later.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-8 px-4 flex justify-center">
      <div className="w-full max-w-4xl flex flex-col h-[calc(100vh-140px)] border border-white/10 rounded-3xl bg-secondary/30 backdrop-blur-xl overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[100px] pointer-events-none" />
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center gap-4 bg-primary/40 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/30">
            <Bot className="w-6 h-6 text-gold" />
          </div>
          <div>
            <h1 className="text-xl font-serif text-white font-semibold">Campus AI Assistant</h1>
            <p className="text-xs text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Online and ready to help</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative z-10">
          {messages.map((m, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 border border-gold/30">
                  <Bot className="w-4 h-4 text-gold" />
                </div>
              )}
              <div className={`p-4 max-w-[80%] rounded-2xl ${
                m.role === 'user' 
                  ? 'bg-gold text-primary rounded-tr-sm shadow-[0_5_15px_rgba(201,168,76,0.2)]' 
                  : 'bg-white/5 border border-white/10 text-white rounded-tl-sm backdrop-blur-md'
              }`}>
                <p className={`text-sm leading-relaxed ${m.role === 'user' ? 'font-medium' : ''} break-words`}>
                  {m.content}
                </p>
              </div>
              {m.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-primary/50 flex items-center justify-center flex-shrink-0 border border-white/10">
                  <User className="w-4 h-4 text-muted" />
                </div>
              )}
            </motion.div>
          ))}
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 justify-start">
               <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 border border-gold/30">
                  <Bot className="w-4 h-4 text-gold" />
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 rounded-tl-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold/50 animate-pulse" />
                  <span className="w-2 h-2 rounded-full bg-gold/50 animate-pulse" style={{ animationDelay: "0.2s" }} />
                  <span className="w-2 h-2 rounded-full bg-gold/50 animate-pulse" style={{ animationDelay: "0.4s" }} />
                </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-primary/40 border-t border-white/10 relative z-10">
          {messages.length < 3 && !isLoading && (
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 custom-scrollbar">
              {['Where is the CS lab?', 'How to apply for hostel?', 'What is the placement %?'].map(prompt => (
                <button 
                  key={prompt} 
                  onClick={() => handleSend(prompt)}
                  className="whitespace-nowrap px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-xs text-gold hover:bg-gold hover:text-primary transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> {prompt}
                </button>
              ))}
            </div>
          )}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="flex gap-3 relative"
          >
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message..." 
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-muted focus:outline-none focus:border-gold/50 transition-colors shadow-inner"
            />
            <button 
              title="Send Message"
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="px-6 py-4 bg-gold text-primary rounded-xl font-bold flex items-center justify-center hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(201,168,76,0.3)] hover:shadow-[0_0_20px_rgba(201,168,76,0.5)]"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
