import React from 'react';
import { Globe, MessageCircle } from 'lucide-react';

const ModelSelector = ({ mode, onModeChange }) => {
  return (
    <div className="w-full border-t bg-white pt-2 md:border-t-0 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient">
      <div className="relative flex h-full flex-1 items-center justify-center gap-2">
        <button
          onClick={() => onModeChange('chat')}
          className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
            mode === 'chat' 
              ? 'bg-gray-100 text-gray-900' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <MessageCircle size={16} />
          Chat
        </button>
        <button
          onClick={() => onModeChange('research')}
          onDoubleClick={() => onModeChange('chat')}
          className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
            mode === 'research' 
              ? 'bg-gray-100 text-gray-900' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Globe size={16} />
          Research
        </button>
      </div>
    </div>
  );
};

export default ModelSelector;