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
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-center">
            <Loader2 className="animate-spin" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSend={onSendMessage} disabled={isLoading} />
    </div>
  );
};

export default Chat;
