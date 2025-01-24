import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import MessageInput from './MessageInput';
import { Loader2 } from 'lucide-react';

const Chat = ({ messages, isLoading, onSendMessage }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full pb-32"> {/* Added pb-32 for model selector space */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-4">
          {messages.length === 0 && !isLoading && (
            <div className="text-center text-gray-500 py-8">
              Start a conversation...
            </div>
          )}
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-center py-4">
              <Loader2 className="animate-spin text-gray-400" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="absolute bottom-32 left-0 w-full bg-white"> {/* Positioned above model selector */}
        <div className="mx-auto max-w-2xl px-4">
          <MessageInput onSend={onSendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Chat;