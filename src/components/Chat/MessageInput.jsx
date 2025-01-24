import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

const MessageInput = ({ onSend, disabled }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleSubmit = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  return (
    <div className="relative flex w-full flex-grow flex-col">
      <div className="relative flex items-center">
        <textarea
          ref={textareaRef}
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder="Message ShantAgent..."
          className="w-full resize-none rounded-lg border border-gray-200 bg-white pr-12 text-sm py-3 px-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
          disabled={disabled}
        />
        <button
          onClick={handleSubmit}
          disabled={disabled || !message.trim()}
          className="absolute right-2 top-2.5 h-7 w-7 rounded hover:bg-gray-100 disabled:hover:bg-transparent disabled:opacity-40 flex items-center justify-center"
        >
          {disabled ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>
    </div>
  );
};

export default MessageInput;