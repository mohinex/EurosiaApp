import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, Sparkles, Brain, Cpu } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your EUROSIA Assistant. How can I help you manage your ecosystem today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API key not configured");
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: "You are an expert business assistant for EUROSIA App Ecosystem. You help users manage their POS, ERP, CRM, and accounting systems. You are professional, concise, and helpful."
        }
      });

      const assistantMessage = response.text || "I'm sorry, I couldn't process that request.";
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting to my brain right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#B91C1C] text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50 group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }}>
              <Bot size={28} />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-28 right-8 w-[400px] h-[600px] bg-white rounded-[32px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] border border-gray-100 flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="p-6 bg-gray-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#B91C1C] rounded-xl flex items-center justify-center">
                  <Sparkles size={20} fill="currentColor" />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-widest">EUROSIA AI</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Always active • v2.4</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Brain size={18} className="text-gray-500" />
                <Cpu size={18} className="text-gray-500" />
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50"
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#B91C1C] text-white rounded-tr-none' 
                      : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                   <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none flex gap-1">
                      <div className="w-1.5 h-1.5 bg-[#B91C1C] rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-[#B91C1C] rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-[#B91C1C] rounded-full animate-bounce [animation-delay:0.4s]" />
                   </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-white border-t border-gray-50">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask any business question..."
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-[#B91C1C]/10 transition-all pr-14"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-2 top-2 w-10 h-10 bg-[#B91C1C] text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-[#991B1B] transition-all disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center mt-4"> Powered by Google Gemini 3.0 </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
