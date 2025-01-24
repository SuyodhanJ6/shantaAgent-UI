import React from 'react';
import { Trash2 } from 'lucide-react';

const ThreadList = ({ threads, currentThread, onSelect, onDelete }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {threads.map(thread => (
        <div
          key={thread.id}
          onClick={() => onSelect(thread.id)}
          className={`flex items-center justify-between p-2 text-gray-300 hover:bg-gray-700 rounded cursor-pointer mb-1 ${
            currentThread === thread.id ? 'bg-gray-700' : ''
          }`}
        >
          <span className="truncate flex-1">
            {new Date(thread.timestamp).toLocaleDateString()}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(thread.id);
            }}
            className="text-gray-400 hover:text-red-400"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ThreadList;