import React, { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

export default function Chat({ messages, isLoading }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-4 ${message.type === 'human' ? 'text-right' : 'text-left'}`}
        >
          <div
            className={`inline-block p-3 rounded-lg ${
              message.type === 'human'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
            } max-w-[80%]`}
          >
            {message.content}
            {message.metadata?.sources && (
              <div className="mt-2 text-xs text-gray-500">
                {message.metadata.sources.map((source, i) => (
                  <a 
                    key={i}
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:underline"
                  >
                    Source {i + 1}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-center">
          <Loader2 className="animate-spin" />
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}