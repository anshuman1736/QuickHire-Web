"use client"

import { useState } from "react"
import ChatList from "./chat-list"
import ChatWindow from "./chat-window"
import ProfileSettings from "./profile-settings"

export default function ChatDashboard() {
  const [selectedChat, setSelectedChat] = useState<number | null>(1)
  const [showSettings, setShowSettings] = useState(false)
  console.log("Selected Chat:", selectedChat)

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-full md:w-80 h-screen flex flex-col bg-white border-r">
        <ChatList
          onSelectChat={setSelectedChat}
          selectedChat={selectedChat}
          onOpenSettings={() => setShowSettings(true)}
        />
      </div>

      {selectedChat && (
      <div className="hidden md:block flex-1 h-screen">
        <ChatWindow chatId={selectedChat} />
      </div>
          )}

        

      {showSettings && <ProfileSettings onClose={() => setShowSettings(false)} />}
    </div>
  )
}
