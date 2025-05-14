"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";

// Mock data for chat list
const chatData = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Hey, are we still meeting today?",
    time: "10:30 AM",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I've sent you the files you requested",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for your help!",
    time: "Yesterday",
    unread: 0,
    online: true,
  },
  {
    id: 4,
    name: "James Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Let's discuss the project tomorrow",
    time: "Monday",
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: "Olivia Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Can you review my presentation?",
    time: "Monday",
    unread: 3,
    online: true,
  },
];

interface ChatListProps {
  onSelectChat: (chatId: number) => void;
  selectedChat: number | null;
}

export default function ChatingList({
  onSelectChat,
  selectedChat,
}: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = chatData.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header with profile and search */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-1  ">
            <div className="group relative">
              <button className="p-2 rounded-full hover:bg-gray-300 bg-gray-200 cursor-pointer text-gray-600">
                <Plus size={20} />
              </button>
              <p className="absolute  top-7   ml-2 hidden group-hover:block bg-white shadow px-2 py-1 rounded text-sm">
                Chat with another sales
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat list */}
      <div className="flex-1 ">
        {filteredChats.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {filteredChats.map((chat) => (
              <li
                key={chat.id}
                className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedChat === chat.id ? "bg-blue-50" : ""
                }`}
                onClick={() => onSelectChat(chat.id)}
              >
                <div className="flex items-start p-4 gap-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src={chat.avatar || "/placeholder.svg"}
                      alt={chat.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {chat.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-semibold truncate">{chat.name}</h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {chat.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {chat.lastMessage}
                    </p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="ml-2 flex-shrink-0">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-medium">
                        {chat.unread}
                      </span>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <p className="text-gray-500 mb-2">No conversations found</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors">
              Start a new chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
