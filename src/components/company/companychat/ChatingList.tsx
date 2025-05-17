"use client";

import { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";

interface SalesPerson {
  roomId: number;
  randomAdmin: string;
  randomAdminId: number;
  allocateTo: number | string;
}

interface ChatListProps {
  onSelectChat: (chatId: number) => void;
  selectedChat: number | null;
  fetchSalesPersons: () => Promise<{
    data?: { CONTENT: SalesPerson[] };
    CONTENT?: SalesPerson[];
  }>;
}

export default function SalesPersonList({
  onSelectChat,
  selectedChat,
  fetchSalesPersons,
}: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [salesPersons, setSalesPersons] = useState<SalesPerson[]>([]);

  useEffect(() => {
    fetchSalesPersons()
      .then((response) => {
        if (response && response.data && response.data.CONTENT) {
          setSalesPersons(response.data.CONTENT);
        } else if (response && response.CONTENT) {
          setSalesPersons(response.CONTENT);
        } else {
          console.error("Unexpected response format:", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching sales persons:", error);
      });
  }, [fetchSalesPersons]);

  const filteredSalesPersons = salesPersons.filter((person) => {
    const searchTarget = person.randomAdmin.toLowerCase();
    return searchTarget.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search sales persons..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-1">
            <div className="group relative">
              <button className="p-2 rounded-full hover:bg-gray-300 bg-gray-200 cursor-pointer text-gray-600">
                <Plus size={20} />
              </button>
              <p className="absolute top-7 ml-2 hidden group-hover:block bg-white shadow px-2 py-1 rounded text-sm">
                Chat with another sales
              </p>
            </div>
          </div>
        </div>
      </div>

      
      <div className="flex-1 overflow-y-auto">
        {filteredSalesPersons.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {filteredSalesPersons.map((person: SalesPerson) => (
              <li
                key={person.roomId}
                className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedChat === person.roomId ? "bg-blue-50" : ""
                }`}
                onClick={() => onSelectChat(person.roomId)}
              >
                <div className="flex items-start p-4 gap-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt={`Sales Person ${person.randomAdmin}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-semibold truncate">{person.randomAdmin}</h3>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      Admin ID: {person.randomAdminId}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <p className="text-gray-500 mb-2">No sales persons found</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors">
              Add a sales person
            </button>
          </div>
        )}
      </div>
    </div>
  );
}