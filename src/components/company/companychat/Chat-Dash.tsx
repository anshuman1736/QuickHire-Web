"use client";

import React, { useState } from "react";
import ChatingList from "./ChatingList";
import ChatWindow from "./chat-window";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-full md:w-80 h-screen flex flex-col bg-white border-r">
        
        <ChatingList
          onSelectChat={setSelectedChat}
          selectedChat={selectedChat}
        />
      </div>

      <div className="hidden md:block flex-1 h-screen">
        <ChatWindow chatId={selectedChat} />
      </div>

      {/* Mobile chat view - shows when a chat is selected */}
      {selectedChat && (
        <div className="fixed inset-0 bg-white z-50 md:hidden">
          <ChatWindow
            chatId={selectedChat}
            isMobile={true}
            onBack={() => setSelectedChat(null)}
          />
        </div>
      )}
    </div>
  );
};

export default Chat;
