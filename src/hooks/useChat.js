import { useState, useCallback } from 'react';
import { chatApi } from '../services/api';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [threads, setThreads] = useState([]);
  const [currentThread, setCurrentThread] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (message) => {
    setIsLoading(true);
    try {
      const response = await chatApi.sendMessage(message, currentThread);
      setMessages(prev => [...prev, { type: 'human', content: message }, response]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentThread]);

  const createNewThread = useCallback(async () => {
    try {
      const { thread_id } = await chatApi.createThread();
      setThreads(prev => [...prev, { id: thread_id, timestamp: new Date() }]);
      setCurrentThread(thread_id);
      setMessages([]);
    } catch (error) {
      console.error('Error creating thread:', error);
    }
  }, []);

  const loadThread = useCallback(async (threadId) => {
    setIsLoading(true);
    try {
      const history = await chatApi.getHistory(threadId);
      setMessages(history.messages);
      setCurrentThread(threadId);
    } catch (error) {
      console.error('Error loading thread:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    threads,
    currentThread,
    isLoading,
    sendMessage,
    createNewThread,
    loadThread
  };
}
