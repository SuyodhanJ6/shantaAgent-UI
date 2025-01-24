const API_URL = 'http://localhost:8000/v1';

export const chatApi = {
  async sendMessage(message, threadId, mode = 'chat') {
    const endpoint = mode === 'research' ? '/research' : '/chat';
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, thread_id: threadId })
    });
    if (!response.ok) {
      throw new Error('Failed to send message');
    }
    return response.json();
  },

  async createThread() {
    const response = await fetch(`${API_URL}/chat/new`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to create thread');
    }
    return response.json();
  },

  async getHistory(threadId, mode = 'chat') {
    const endpoint = mode === 'research' ? '/research/history' : '/chat/history';
    const response = await fetch(`${API_URL}${endpoint}/${threadId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch history');
    }
    return response.json();
  },

  async deleteThread(threadId) {
    const response = await fetch(`${API_URL}/chat/history/${threadId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete thread');
    }
    return response.json();
  }
};