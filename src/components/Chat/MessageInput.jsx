import React, { useState } from 'react';
import { Send } from 'lucide-react';

const MessageInput = ({ onSend, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <div className="input-panel py-4">
      <div className="relative flex flex-col w-full flex-grow">
        <div className="relative flex">
          <textarea
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="Message ChatGPT..."
            className="w-full resize-none rounded-lg border border-gray-200 bg-white pr-12 text-sm py-3 px-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
            disabled={disabled}
          />
          <button
            onClick={handleSubmit}
            disabled={disabled || !message.trim()}
            className="absolute right-2 top-2.5 h-7 w-7 rounded hover:bg-gray-100 disabled:hover:bg-transparent disabled:opacity-40 flex items-center justify-center"
          >
            <Send size={18} className="text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;