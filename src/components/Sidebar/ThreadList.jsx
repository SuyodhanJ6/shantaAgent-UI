// src/components/Sidebar/ThreadList.jsx
import React from 'react';
import { MessageCircle, Trash2, Loader2 } from 'lucide-react';

const ThreadList = ({ threads, currentThread, onSelect, onDelete, isLoading }) => {
  const formatDate = (timestamp) => {
    try {
      return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date(timestamp));
    } catch {
      return 'Invalid date';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-20">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {threads.map((thread) => (
        <div
          key={thread.id}
          className={`flex items-center justify-between px-3 py-2 cursor-pointer group ${
            currentThread === thread.id
              ? 'bg-gray-700 text-white'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
          onClick={() => onSelect(thread.id)}
        >
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-4 h-4" />
            <span className="truncate">{formatDate(thread.timestamp)}</span>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(thread.id);
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
          </button>
        </div>
      ))}

      {threads.length === 0 && !isLoading && (
        <div className="text-center py-4 text-gray-400">
          No conversations yet
        </div>
      )}
    </div>
  );
};

export default ThreadList;