// src/hooks/useChat.js
import { useState, useCallback, useRef, useEffect } from 'react';
import { chatApi } from '../services/api';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [threads, setThreads] = useState([]);
  const [currentThread, setCurrentThread] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('chat');
  const readerRef = useRef(null);

  // Load threads on mount
  useEffect(() => {
    loadInitialThreads();
  }, []);

  const loadInitialThreads = async () => {
    try {
      // Load both chat and research threads
      const chatThreads = await chatApi.getThreads('chat');
      const researchThreads = await chatApi.getThreads('research');
      
      // Combine and sort threads by timestamp
      const allThreads = [...chatThreads, ...researchThreads]
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      setThreads(allThreads);
    } catch (error) {
      console.error('Error loading threads:', error);
      setError('Failed to load chat history');
    }
  };

  // Switch mode without clearing messages
  const switchMode = useCallback((newMode) => {
    if (newMode !== mode) {
      setMode(newMode);
      // Keep current thread and messages
      cleanupStream();
    }
  }, [mode]);

  const cleanupStream = () => {
    if (readerRef.current) {
      readerRef.current.cancel();
      readerRef.current = null;
    }
  };

  useEffect(() => {
    return () => cleanupStream();
  }, []);

  const sendMessage = useCallback(async (message) => {
    setIsLoading(true);
    cleanupStream();

    try {
      // Add user message immediately
      const userMessage = { 
        type: 'human', 
        content: message,
        metadata: { mode } 
      };
      setMessages(prev => [...prev, userMessage]);

      // Get streaming response
      const response = await chatApi.sendMessage({
        message,
        thread_id: currentThread,
        mode,
        stream: true
      });

      const reader = response.getReader();
      readerRef.current = reader;
      const decoder = new TextDecoder();

      // Initialize AI message
      setMessages(prev => [...prev, { type: 'ai', content: '', metadata: { mode } }]);

      let accumulatedResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.type === 'token') {
                accumulatedResponse += data.content;
                setMessages(prev => {
                  const newMessages = [...prev];
                  const lastMessage = newMessages[newMessages.length - 1];
                  if (lastMessage && lastMessage.type === 'ai') {
                    lastMessage.content = accumulatedResponse;
                    if (data.metadata) {
                      lastMessage.metadata = {
                        ...lastMessage.metadata,
                        ...data.metadata,
                        mode
                      };
                    }
                  }
                  return newMessages;
                });
              }
            } catch (e) {
              console.error('Error parsing chunk:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError(error.message);
      setMessages(prev => [...prev, {
        type: 'ai',
        content: 'Sorry, there was an error processing your message.',
        metadata: { error: true, mode }
      }]);
    } finally {
      setIsLoading(false);
      cleanupStream();
    }
  }, [currentThread, mode]);

  const createThread = useCallback(async () => {
    try {
      const { thread_id } = await chatApi.createThread(mode);
      const newThread = {
        id: thread_id,
        timestamp: new Date().toISOString(),
        mode,
        messages: []
      };
      setThreads(prev => [newThread, ...prev]);
      setCurrentThread(thread_id);
      setMessages([]);
      return thread_id;
    } catch (error) {
      console.error('Error creating thread:', error);
      setError('Failed to create new thread');
    }
  }, [mode]);

  const loadThread = useCallback(async (threadId) => {
    if (!threadId) return;
    
    setIsLoading(true);
    try {
      // Find thread to get its mode
      const thread = threads.find(t => t.id === threadId);
      
      // Load thread history using the thread's original mode
      const response = await chatApi.getHistory(threadId, thread?.mode || mode);
      
      setMessages(response.messages);
      setCurrentThread(threadId);
      
      // Set mode based on last message or thread metadata
      const lastMessage = response.messages[response.messages.length - 1];
      if (lastMessage?.metadata?.mode) {
        setMode(lastMessage.metadata.mode);
      } else if (thread?.mode) {
        setMode(thread.mode);
      }
    } catch (error) {
      console.error('Error loading thread:', error);
      setError('Failed to load chat history');
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  }, [threads, mode]);

  const deleteThread = useCallback(async (threadId) => {
    try {
      const thread = threads.find(t => t.id === threadId);
      await chatApi.deleteThread(threadId, thread?.mode || mode);
      setThreads(prev => prev.filter(t => t.id !== threadId));
      if (currentThread === threadId) {
        setCurrentThread(null);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error deleting thread:', error);
      setError('Failed to delete thread');
    }
  }, [currentThread, mode, threads]);

  return {
    messages,
    threads,
    currentThread,
    isLoading,
    error,
    mode,
    sendMessage,
    createThread,
    loadThread,
    deleteThread,
    switchMode,
    setError
  };
}