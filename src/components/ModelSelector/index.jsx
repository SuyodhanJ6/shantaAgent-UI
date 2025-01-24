import React from 'react';
import { Globe, MessageCircle } from 'lucide-react';

const ModelSelector = ({ mode, onModeChange }) => {
  return (
    <div className="border-t border-gray-200 p-4">
      <div className="flex justify-center gap-2">
        <button
          onClick={() => onModeChange('chat')}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
            mode === 'chat' 
              ? 'bg-gray-200 text-gray-800' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <MessageCircle size={16} />
          Chat
        </button>
        <button
          onClick={() => onModeChange('research')}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
            mode === 'research' 
              ? 'bg-gray-200 text-gray-800' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          onDoubleClick={() => onModeChange('chat')}
        >
          <Globe size={16} />
          Research
        </button>
      </div>
    </div>
  );
};

export default ModelSelector;