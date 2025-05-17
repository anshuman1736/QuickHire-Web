"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, Paperclip, ArrowLeft } from "lucide-react"
import useWebSocket from "@/hooks/use.webSocket"

interface ChatWindowProps {
  chatId: number | null
  isMobile?: boolean
  onBack?: () => void
}

interface Message {
  id: number
  text: string
  sender: string
  time: string
}

// Chat details - you might want to replace this with an API call to get user details
const chatDetails = {
  1: { name: "Sarah Johnson", avatar: "/placeholder.svg?height=40&width=40", online: true },
  2: { name: "Michael Chen", avatar: "/placeholder.svg?height=40&width=40", online: false },
  3: { name: "Emma Wilson", avatar: "/placeholder.svg?height=40&width=40", online: true },
  4: { name: "James Rodriguez", avatar: "/placeholder.svg?height=40&width=40", online: false },
  5: { name: "Olivia Smith", avatar: "/placeholder.svg?height=40&width=40", online: true },
}

export default function ChatWindow({ chatId, isMobile = false, onBack }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const { isConnected, joinRoom, leaveRoom, sendMessage } = useWebSocket()

  useEffect(() => {
    if (chatId && isConnected) {
      const roomId = String(chatId)
      joinRoom(roomId)
      
      return () => {
        leaveRoom(roomId)
      }
    }
  }, [chatId, isConnected, joinRoom, leaveRoom])

  useEffect(() => {
    const handleWebSocketMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data)
        
        if (data.type === "message" && data.payload.roomId === String(chatId)) {
          const newMsg = {
            id: Date.now(),
            text: data.payload.message,
            sender: data.payload.senderId === localStorage.getItem("userId") ? "me" : "other",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
          
          setMessages(prevMessages => [...prevMessages, newMsg])
        }
      } catch (error) {
        console.error("Error handling WebSocket message:", error)
      }
    }

    window.addEventListener('message', handleWebSocketMessage)
    
    return () => {
      window.removeEventListener('message', handleWebSocketMessage)
    }
  }, [chatId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !chatId || !isConnected) return

    sendMessage(String(chatId), newMessage)

    const newMsg = {
      id: Date.now(),
      text: newMessage,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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

  const currentChatDetails = chatDetails[chatId as keyof typeof chatDetails] || {
    name: `Chat ${chatId}`,
    avatar: "/placeholder.svg?height=40&width=40",
    online: false
  }

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
              src={currentChatDetails.avatar || "/placeholder.svg"}
              alt={currentChatDetails.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {currentChatDetails.online && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            )}
          </div>
          <div>
            <h2 className="font-semibold">{currentChatDetails.name}</h2>
            <p className="text-xs text-green-500">
              {isConnected ? "Connected" : "Connecting..."}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 bg-gray-50">
        <div className="space-y-3 max-w-3xl mx-auto">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
              {message.sender !== "me" && (
                <img
                  src={currentChatDetails.avatar || "/placeholder.svg"}
                  alt={currentChatDetails.name}
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
              className="w-full px-4 py-3 bg-gray-100 rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white pr-10"
              placeholder={isConnected ? "Type a message..." : "Connecting..."}
              rows={1}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={!isConnected}
            />
          </div>
          <button
            className={`p-3 rounded-full ${
              newMessage.trim() && isConnected
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || !isConnected}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}