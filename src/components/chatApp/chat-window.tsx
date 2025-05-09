"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Paperclip,  ArrowLeft } from "lucide-react"

interface ChatWindowProps {
  chatId: number | null
  isMobile?: boolean
  onBack?: () => void
}

// Mock data for messages
const mockMessages = {
  1: [
    { id: 1, text: "Hey, how are you doing?", sender: "other", time: "10:00 AM" },
    { id: 2, text: "I'm good, thanks! Just finishing up some work. How about you?", sender: "me", time: "10:05 AM" },
    { id: 3, text: "Pretty good! Are we still meeting today?", sender: "other", time: "10:10 AM" },
    { id: 4, text: "Yes, I'll be free around 3 PM. Does that work for you?", sender: "me", time: "10:15 AM" },
    { id: 5, text: "Perfect! Let's meet at the usual place.", sender: "other", time: "10:20 AM" },
    { id: 6, text: "Sounds good. I'll see you then!", sender: "me", time: "10:25 AM" },
  ],
  2: [
    { id: 1, text: "Hi Michael, did you get a chance to look at those files?", sender: "me", time: "Yesterday" },
    {
      id: 2,
      text: "Yes, I've just finished reviewing them. I've sent you my feedback via email.",
      sender: "other",
      time: "Yesterday",
    },
    { id: 3, text: "Great, I'll check my email now. Thanks!", sender: "me", time: "Yesterday" },
    { id: 4, text: "I've sent you the project files", sender: "other", time: "Yesterday" },
  ],
  3: [
    { id: 1, text: "Emily, I need your help with something.", sender: "me", time: "Yesterday" },
    { id: 2, text: "Sure, what do you need?", sender: "other", time: "Yesterday" },
    {
      id: 3,
      text: "I'm having trouble with the new software. Can you walk me through it?",
      sender: "me",
      time: "Yesterday",
    },
    {
      id: 4,
      text: "Of course! Let's set up a call and I'll show you how it works.",
      sender: "other",
      time: "Yesterday",
    },
  ],
  4: [
    { id: 1, text: "Hey James, how's the project coming along?", sender: "me", time: "Monday" },
    { id: 2, text: "It's going well! We're on track to finish by Friday.", sender: "other", time: "Monday" },
    { id: 3, text: "That's great to hear. Let me know if you need any help.", sender: "me", time: "Monday" },
    { id: 4, text: "Will do. Let's discuss the project tomorrow", sender: "other", time: "Monday" },
  ],
  5: [
    { id: 1, text: "Hi Olivia, have you finished the presentation?", sender: "me", time: "Monday" },
    { id: 2, text: "Almost done! Just adding the final touches.", sender: "other", time: "Monday" },
    { id: 3, text: "Great! When can I take a look?", sender: "me", time: "Monday" },
    { id: 4, text: "Can you review my presentation?", sender: "other", time: "Monday" },
  ],
}

// Mock data for chat details
const mockChatDetails = {
  1: { name: "Sarah Johnson", avatar: "/placeholder.svg?height=40&width=40", online: true },
  2: { name: "Michael Chen", avatar: "/placeholder.svg?height=40&width=40", online: false },
  3: { name: "Emma Wilson", avatar: "/placeholder.svg?height=40&width=40", online: true },
  4: { name: "James Rodriguez", avatar: "/placeholder.svg?height=40&width=40", online: false },
  5: { name: "Olivia Smith", avatar: "/placeholder.svg?height=40&width=40", online: true },
}

export default function ChatWindow({ chatId, isMobile = false, onBack }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState("")
  interface Message {
    id: number
    text: string
    sender: string
    time: string
  }
  
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatId && mockMessages[chatId as keyof typeof mockMessages]) {
      setMessages(mockMessages[chatId as keyof typeof mockMessages])
    } else {
      setMessages([])
    }
  }, [chatId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !chatId) return

    const newMsg = {
      id: Date.now(),
      text: newMessage,
      sender: "me",
      time: "Just now",
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!chatId) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center p-4">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Select a conversation</h3>
          <p className="text-gray-500">Choose a chat from the list to start messaging</p>
        </div>
      </div>
    )
  }

  const chatDetails = mockChatDetails[chatId as keyof typeof mockChatDetails]

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Chat header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          {isMobile && (
            <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
              <ArrowLeft size={20} />
            </button>
          )}
          <div className="relative">
            <img
              src={chatDetails.avatar || "/placeholder.svg"}
              alt={chatDetails.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {chatDetails.online && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            )}
          </div>
          <div>
            <h2 className="font-semibold">{chatDetails.name}</h2>
            <p className="text-xs text-green-500">{chatDetails.online ? "Online" : "Offline"}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1  p-4 bg-gray-50">
        <div className="space-y-3 max-w-3xl mx-auto">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
              {message.sender !== "me" && (
                <img
                  src={chatDetails.avatar || "/placeholder.svg"}
                  alt={chatDetails.name}
                  className="w-8 h-8 rounded-full mr-2 self-end"
                />
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                  message.sender === "me" ? "bg-blue-500 text-white rounded-br-none" : "bg-white border rounded-bl-none"
                }`}
              >
                <p className="break-words">{message.text}</p>
                <p className={`text-xs mt-1 text-right ${message.sender === "me" ? "text-blue-100" : "text-gray-500"}`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message input */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
            <Paperclip size={20} />
          </button>
          <div className="relative flex-1">
            <textarea
              className="w-full px-4 py-3 bg-gray-100 rounded-full resize-none  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white pr-10"
              placeholder="Type a message..."
              rows={1}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button
            className={`p-3 rounded-full ${
              newMessage.trim()
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
