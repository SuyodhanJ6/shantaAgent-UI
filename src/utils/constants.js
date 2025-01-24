export const API_ENDPOINTS = {
    CHAT: '/chat',
    RESEARCH: '/research',
    NEW_THREAD: '/chat/new',
    CHAT_HISTORY: (threadId) => `/chat/history/${threadId}`,
    RESEARCH_HISTORY: (threadId) => `/research/history/${threadId}`,
  };
  
  export const MODES = {
    CHAT: 'chat',
    RESEARCH: 'research',
  };