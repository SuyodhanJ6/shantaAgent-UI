import { useState, useCallback } from 'react';
import { chatApi } from '../services/api';
import { MODES } from '../utils/constants';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [threads, setThreads] = useState([]);
  const [currentThread, setCurrentThread] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState(MODES.CHAT);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (message) => {
    if (!currentThread) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Add user message immediately
      const userMessage = { type: 'human', content: message };
      setMessages(prev => [...prev, userMessage]);

      // Send to API
      const response = await chatApi.sendMessage(message, currentThread, mode);
      setMessages(prev => [...prev, response]);
    } catch (err) {
      setError(err.message);
      setMessages(prev => [...prev, {
        type: 'ai',
        content: 'Sorry, there was an error processing your request.',
        metadata: { error: err.message }
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [currentThread, mode]);

  const createThread = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await chatApi.createThread();
      const newThread = {
        id: response.thread_id,
        timestamp: new Date(),
      };
      setThreads(prev => [...prev, newThread]);
      setCurrentThread(response.thread_id);
      setMessages([]);
      return response.thread_id;
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadThread = useCallback(async (threadId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const history = await chatApi.getHistory(threadId, mode);
      setMessages(history.messages);
      setCurrentThread(threadId);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [mode]);

  const deleteThread = useCallback(async (threadId) => {
    setError(null);
    
    try {
      await chatApi.deleteThread(threadId);
      setThreads(prev => prev.filter(thread => thread.id !== threadId));
      if (currentThread === threadId) {
        setCurrentThread(null);
        setMessages([]);
      }
    } catch (err) {
      setError(err.message);
    }
  }, [currentThread]);

  const switchMode = useCallback((newMode) => {
    setMode(newMode);
    if (currentThread) {
      loadThread(currentThread);
    }
  }, [currentThread, loadThread]);

  return {
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
  };
}