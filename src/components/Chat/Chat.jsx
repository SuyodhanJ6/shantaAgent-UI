// src/components/Chat/Chat.jsx
import React, { useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import MessageInput from './MessageInput';

const Chat = ({ messages = [], isLoading, onSendMessage }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              Start a conversation...
            </div>
          )}
          
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === 'human' ? 'justify-end' : 'justify-start'
              } mb-4`}
            >
              <div
                className={`max-w-[85%] px-4 py-2 rounded-lg ${
                  message.type === 'human'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
                {message.metadata?.sources && (
                  <div className="mt-2 text-xs opacity-75">
                    <div className="font-medium">Sources:</div>
                    <ul className="list-disc pl-4">
                      {message.metadata.sources.map((source, i) => (
                        <li key={i}>
                          <a 
                            href={source} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {new URL(source).hostname}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-center items-center py-4">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto p-4">
          <MessageInput 
            onSend={onSendMessage}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;