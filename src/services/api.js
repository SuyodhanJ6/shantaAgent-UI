// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/v1';
const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${AUTH_TOKEN}`
};

export const chatApi = {
  async getThreads(mode = 'chat') {
    try {
      const response = await fetch(`${API_URL}/${mode}/threads`, {
        headers
      });
      if (!response.ok) throw new Error('Failed to fetch threads');
      const data = await response.json();
      return data.threads.map(thread => ({
        ...thread,
        mode // Add mode to thread metadata
      }));
    } catch (error) {
      console.error('Error fetching threads:', error);
      return [];
    }
  },

  async sendMessage({ message, thread_id, mode = 'chat', stream = false }) {
    const endpoint = mode === 'research' ? '/research' : '/chat';
    const streamEndpoint = `${endpoint}/stream`;
    
    const url = `${API_URL}${stream ? streamEndpoint : endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        message,
        thread_id,
        stream,
        metadata: { mode } // Include mode in message metadata
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.statusText}`);
    }

    if (stream) {
      return response.body;
    }
    return response.json();
  },

  async getHistory(threadId, mode = 'chat') {
    const endpoint = mode === 'research' ? '/research/history' : '/chat/history';
    const response = await fetch(`${API_URL}${endpoint}/${threadId}`, {
      headers
    });

    if (!response.ok) {
      throw new Error('Failed to fetch chat history');
    }

    const data = await response.json();
    // Add mode to message metadata if not present
    return {
      ...data,
      messages: data.messages.map(msg => ({
        ...msg,
        metadata: {
          ...msg.metadata,
          mode: msg.metadata?.mode || mode
        }
      }))
    };
  },

  async createThread(mode = 'chat') {
    const endpoint = mode === 'research' ? '/research/new' : '/chat/new';
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ metadata: { mode } })
    });

    if (!response.ok) {
      throw new Error('Failed to create thread');
    }

    return response.json();
  },

  async deleteThread(threadId, mode = 'chat') {
    const endpoint = mode === 'research' ? '/research/history' : '/chat/history';
    const response = await fetch(`${API_URL}${endpoint}/${threadId}`, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) {
      throw new Error('Failed to delete thread');
    }

    return response.json();
  }
};