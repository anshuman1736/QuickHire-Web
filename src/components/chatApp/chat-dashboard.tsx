"use client"

import { useState } from "react"
import ChatList from "./chat-list"
import ChatWindow from "./chat-window"
import ProfileSettings from "./profile-settings"

export default function ChatDashboard() {
  const [selectedChat, setSelectedChat] = useState<number | null>(1)
  const [showSettings, setShowSettings] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-full md:w-80 h-screen flex flex-col bg-white border-r">
        <ChatList
          onSelectChat={setSelectedChat}
          selectedChat={selectedChat}
          onOpenSettings={() => setShowSettings(true)}
        />
      </div>

      <div className="hidden md:block flex-1 h-screen">
        <ChatWindow chatId={selectedChat} />
      </div>

      {/* Mobile chat view - shows when a chat is selected */}
      {selectedChat && (
        <div className="fixed inset-0 bg-white z-50 md:hidden">
          <ChatWindow chatId={selectedChat} isMobile={true} onBack={() => setSelectedChat(null)} />
        </div>
      )}

      {/* Settings modal */}
      {showSettings && <ProfileSettings onClose={() => setShowSettings(false)} />}
    </div>
  )
}
