// src/components/Chat/ChatPlaceholder.jsx
import React from 'react';
import { MessageSquare, Search, Zap } from 'lucide-react';

const ChatPlaceholder = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center max-w-xl px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Welcome to ShantAgent
        </h2>
        <div className="grid gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <MessageSquare className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <h3 className="font-medium text-gray-700">Chat Mode</h3>
            <p className="text-sm text-gray-500">
              Have a natural conversation with advanced AI
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <Search className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <h3 className="font-medium text-gray-700">Research Mode</h3>
            <p className="text-sm text-gray-500">
              Get answers with citations and sources
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <Zap className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <h3 className="font-medium text-gray-700">Start Chatting</h3>
            <p className="text-sm text-gray-500">
              Click "New chat" or type a message below to begin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPlaceholder;