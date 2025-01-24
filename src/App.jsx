// // src/App.jsx
// import React from 'react';
// import { useChat } from './hooks/useChat';
// import Sidebar from './components/Sidebar';
// import Chat from './components/Chat';
// import ModelSelector from './components/ModelSelector';
// import ErrorAlert from './components/ErrorAlert';

// function App() {
//   const {
//     messages,
//     threads,
//     currentThread,
//     isLoading,
//     mode,
//     error,
//     sendMessage,
//     createThread,
//     loadThread,
//     deleteThread,
//     switchMode,
//     setError
//   } = useChat();

//   const handleSend = async (message) => {
//     if (message.trim()) {
//       await sendMessage(message);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="hidden md:flex md:flex-col md:w-[260px] bg-gray-900">
//         <Sidebar
//           threads={threads}
//           currentThread={currentThread}
//           onSelect={loadThread}
//           onNew={createThread}
//           onDelete={deleteThread}
//           mode={mode}
//         />
//       </div>

//       {/* Main Chat Area */}
//       <div className="flex flex-1 flex-col overflow-hidden">
//         {error && (
//           <ErrorAlert 
//             message={error} 
//             onDismiss={() => setError(null)}
//           />
//         )}

//         <main className="flex-1 overflow-hidden relative">
//           <div className="h-full flex flex-col">
//             <Chat
//               messages={messages}
//               isLoading={isLoading}
//               onSendMessage={handleSend}
//               mode={mode}
//             />
//           </div>

//           {/* Model Selector */}
//           <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-200">
//             <div className="max-w-3xl mx-auto px-4">
//               <ModelSelector 
//                 mode={mode}
//                 onModeChange={switchMode}
//               />
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { useChat } from './hooks/useChat';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import ModelSelector from './components/ModelSelector';
import ErrorAlert from './components/ErrorAlert';

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
    setError
  } = useChat();

  const handleSendMessage = async (message) => {
    if (message.trim()) {
      await sendMessage(message);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 bg-gray-900">
        <Sidebar
          threads={threads}
          currentThread={currentThread}
          onSelect={loadThread}
          onNew={createThread}
          onDelete={deleteThread}
          mode={mode}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {error && (
          <ErrorAlert 
            message={error} 
            onDismiss={() => setError(null)}
          />
        )}

        <main className="flex-1 overflow-hidden relative">
          <div className="h-full flex flex-col">
            <Chat
              messages={messages}
              isLoading={isLoading}
              onSendMessage={handleSendMessage}
              mode={mode}
            />
          </div>

          {/* Model Selector */}
          <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-200">
            <div className="max-w-3xl mx-auto px-4">
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