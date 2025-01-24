import React from 'react';

const ChatMessage = ({ message }) => {
  const isUser = message.type === 'human';

  return (
    <div className={`text-gray-800 group w-full border-b border-gray-100 ${
      isUser ? 'bg-white' : 'bg-gray-50'
    }`}>
      <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 flex">
        <div className="flex-shrink-0 w-8">
          {isUser ? '👤' : '🤖'}
        </div>
        <div className="relative flex w-[calc(100%-50px)] flex-col gap-1">
          <div className="min-h-[20px] whitespace-pre-wrap">
            {message.content}
          </div>
          {message.metadata?.sources && (
            <div className="mt-2 flex flex-col gap-1">
              {message.metadata.sources.map((source, i) => (
                <a
                  key={i}
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                >
                  Source {i + 1}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;