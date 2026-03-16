"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send, Paperclip, MoreVertical, Smile } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  text: string
  sender: "user" | "agent"
  timestamp: string
}

export function LiveChatWidget({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi there! 👋 How can we help you today?",
      sender: "agent",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate agent response
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for reaching out! I've connected you to a specialist who will review your request shortly.",
        sender: "agent",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, agentMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-6 right-6 w-[360px] h-[600px] max-h-[80vh] bg-white dark:bg-[#150a2e] rounded-3xl shadow-2xl border border-slate-100 dark:border-white/10 flex flex-col overflow-hidden z-[100] animate-in slide-in-from-bottom-8 fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 pb-6 relative shrink-0">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                <span className="text-white font-bold">R</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-purple-600 rounded-full" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Recura Support</h3>
              <p className="text-purple-100 text-xs font-medium">We typically reply in minutes</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
            <button 
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 dark:bg-[#0D0518]/50 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={cn(
              "flex flex-col max-w-[85%]",
              message.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
            )}
          >
            <div 
              className={cn(
                "px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed shadow-sm",
                message.sender === "user" 
                  ? "bg-purple-600 text-white rounded-br-sm" 
                  : "bg-white dark:bg-slate-800 border border-slate-100 dark:border-white/10 text-slate-700 dark:text-slate-200 rounded-bl-sm"
              )}
            >
              {message.text}
            </div>
            <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mt-1 px-1">
              {message.timestamp}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start max-w-[85%] mr-auto">
             <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-white/10 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-[#150a2e] border-t border-slate-100 dark:border-white/10 shrink-0">
        <div className="relative flex items-end gap-2">
          <button className="p-2 text-slate-400 hover:text-purple-600 transition-colors shrink-0 mb-1">
            <Paperclip className="w-5 h-5" />
          </button>
          
          <div className="flex-1 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl p-1 relative focus-within:border-purple-600 focus-within:ring-2 focus-within:ring-purple-600/20 transition-all">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="w-full bg-transparent resize-none max-h-32 min-h-[40px] px-3 py-2 text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
              rows={1}
            />
            <div className="absolute right-2 bottom-2 flex items-center gap-1">
               <button className="p-1.5 text-slate-400 hover:text-purple-600 transition-colors">
                <Smile className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button 
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="p-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="text-center mt-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Powered by Recura AI</span>
        </div>
      </div>
    </div>
  )
}
