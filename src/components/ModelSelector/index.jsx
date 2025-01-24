// src/components/ModelSelector/index.jsx
import React from 'react';
import { MessageCircle, Search } from 'lucide-react';

const ModelSelector = ({ mode, onModeChange }) => {
  return (
    <div className="flex justify-center space-x-2 p-2 border-t border-gray-200 bg-white">
      <button
        onClick={() => onModeChange('chat')}
        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
          mode === 'chat'
            ? 'bg-gray-100 text-gray-900'
            : 'text-gray-500 hover:bg-gray-50'
        }`}
      >
        <MessageCircle className="w-5 h-5 mr-2" />
        Chat
      </button>
      <button
        onClick={() => onModeChange('research')}
        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
          mode === 'research'
            ? 'bg-gray-100 text-gray-900'
            : 'text-gray-500 hover:bg-gray-50'
        }`}
      >
        <Search className="w-5 h-5 mr-2" />
        Research
      </button>
    </div>
  );
};

export default ModelSelector;