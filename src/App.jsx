import React from 'react';
import { useChat } from './hooks/useChat';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import ModelSelector from './components/ModelSelector';

function App() {
  const {
    messages,
    threads,
    currentThread,
    isLoading,
    mode,
    error,
    sendMessage,
    createThread,
    loadThread,
    deleteThread,
    switchMode,
  } = useChat();

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-[260px] md:flex-col">
        <Sidebar
          threads={threads}
          currentThread={currentThread}
          onSelect={loadThread}
          onNew={createThread}
          onDelete={deleteThread}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        <main className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
          <div className="flex-1 overflow-hidden">
            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
                {error}
              </div>
            )}
            <Chat
              messages={messages}
              isLoading={isLoading}
              onSendMessage={sendMessage}
            />
          </div>
          {/* Model Selector at Bottom */}
          <div className="absolute bottom-0 left-0 w-full">
            <div className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
              <ModelSelector 
                mode={mode}
                onModeChange={switchMode}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
