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
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        threads={threads}
        currentThread={currentThread}
        onSelect={loadThread}
        onNew={createThread}
        onDelete={deleteThread}
      />
      <div className="flex-1 flex flex-col">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}
        <Chat
          messages={messages}
          isLoading={isLoading}
          onSendMessage={sendMessage}
        />
        <ModelSelector 
          mode={mode}
          onModeChange={switchMode}
        />
      </div>
    </div>
  );
}

export default App;
