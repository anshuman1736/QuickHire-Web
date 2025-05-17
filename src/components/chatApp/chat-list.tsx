"use client";

import { useState, useEffect } from "react";
import { Search, Settings, Plus } from "lucide-react";
import { GetCompanyRooms } from "@/hooks/sales/GetRoomsCom";

interface Room {
  roomId: number;
  randomAdmin: string;
  randomAdminId: number;
  allocateTo: number | string;
}

interface ChatListProps {
  onSelectChat: (chatId: number) => void;
  selectedChat: number | null;
  onOpenSettings: () => void;
}

export default function ChatList({
  onSelectChat,
  selectedChat,
  onOpenSettings,
}: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId") || "";
    GetCompanyRooms(userId)
      .then((response) => {
        if (response && response.data && response.data.CONTENT) {
          setRooms(response.data.CONTENT);
        } else if (response && response.CONTENT) {
          setRooms(response.CONTENT);
        } else {
          console.error("Unexpected response format:", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
      });
  }, []);

  const filteredRooms = rooms.filter((room) => {
    const searchTarget = String(room.allocateTo).toLowerCase();
    return searchTarget.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative cursor-pointer" onClick={onOpenSettings}>
              <img
                src="/placeholder.svg?height=40&width=40"
                alt="Your profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <h1 className="font-bold text-lg">Chats</h1>
            </div>
          </div>
          <div className="flex gap-1">
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
            >
              <Settings size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
              <Plus size={20} />
            </button>
          </div>
        </div>
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
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredRooms.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {filteredRooms.map((room) => (
              <li
                key={room.roomId}
                className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedChat === room.roomId ? "bg-blue-50" : ""
                }`}
                onClick={() => onSelectChat(room.roomId)}
              >
                <div className="flex items-start p-4 gap-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt={`Room ${room.roomId}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-semibold truncate">
                        {typeof room.allocateTo === 'string' ? room.allocateTo : `User ID: ${room.allocateTo}`}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      Admin: {room.randomAdmin}
                    </p>
                  </div>
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