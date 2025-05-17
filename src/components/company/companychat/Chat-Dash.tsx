"use client";

import React, { useState } from "react";
import SalesPersonList from "./ChatingList";
import ChatWindow from "./chat-window";
import { GetUserRooms } from "@/hooks/recruiter/GetRoomsUser";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  
  const handleSelectChat = (roomId: number) => {
    setSelectedChat(roomId);
  };
  
  const userId = typeof window !== 'undefined' ? localStorage.getItem("companyId") || "" : "";
  
  console.log("Selected Chat:", selectedChat);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-full md:w-80 h-screen flex flex-col bg-white border-r">
        <SalesPersonList
          onSelectChat={handleSelectChat}
          selectedChat={selectedChat}
          fetchSalesPersons={() => GetUserRooms(userId)}
        />
      </div>
      
      <div className="hidden md:block flex-1 h-screen">
        <ChatWindow chatId={selectedChat} />
      </div>
      
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
