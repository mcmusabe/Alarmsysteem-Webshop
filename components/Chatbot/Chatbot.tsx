'use client'

import { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import { useConfiguratorStore } from '@/lib/configurator/state'
import { usePriceCalculation } from '@/hooks/usePriceCalculation'
import {
  getBotResponse,
  getQuickRepliesForStep,
  getProactiveTip,
  getWelcomeMessage,
} from '@/lib/chatbot/contextAwareResponses'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface ChatbotProps {
  onClose: () => void
}

export default function Chatbot({ onClose }: ChatbotProps) {
  // Lees configurator state voor context-aware responses
  const configuratie = useConfiguratorStore()
  const { prijsResultaat } = usePriceCalculation(configuratie)

  // Genereer context-aware welcome message
  const welcomeMessage = getWelcomeMessage(configuratie)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: welcomeMessage,
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Update welcome message wanneer configuratie verandert
  useEffect(() => {
    const newWelcomeMessage = getWelcomeMessage(configuratie)
    if (messages.length === 1 && messages[0].sender === 'bot') {
      setMessages([
        {
          id: '1',
          text: newWelcomeMessage,
          sender: 'bot',
          timestamp: new Date(),
        },
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configuratie.currentStep])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Genereer context-aware bot response
    setTimeout(() => {
      const botResponse = getBotResponse(userMessage.text, configuratie, prijsResultaat)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Genereer context-aware quick replies op basis van stap
  const quickReplies = getQuickRepliesForStep(configuratie.currentStep, configuratie)
  
  // Proactieve tip
  const proactiveTip = getProactiveTip(configuratie)

  const handleQuickReply = (reply: string) => {
    setInput(reply)
    setTimeout(() => handleSend(), 100)
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-black text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-accent text-xl">💬</span>
          </div>
          <div>
            <h3 className="font-semibold">Help Assistent</h3>
            <p className="text-xs text-gray-100">We zijn meestal binnen 1 minuut online</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors"
          aria-label="Sluit chat"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={clsx('flex', message.sender === 'user' ? 'justify-end' : 'justify-start')}
          >
            <div
              className={clsx(
                'max-w-[80%] rounded-lg px-4 py-2',
                message.sender === 'user'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-800'
              )}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString('nl-NL', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Proactieve Tip */}
      {proactiveTip && messages.length === 1 && (
        <div className="px-4 pb-2">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2">
            <p className="text-xs text-blue-800">
              <span className="font-semibold">Tip:</span> {proactiveTip}
            </p>
          </div>
        </div>
      )}

      {/* Quick Replies */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Typ uw bericht..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Verstuur
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Of bel direct: <a href="tel:0573215100" className="text-black hover:underline font-medium">0573 - 21 51 00</a>
        </p>
      </div>
    </div>
  )
}

