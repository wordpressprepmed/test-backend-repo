import axios from 'axios';

// Use environment variable if provided, otherwise default to localhost:3000
// Also note Vite proxy handles relative paths if needed
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 45000, // 45 seconds for image uploads
});

export const api = {
  // Check backend server status
  async checkHealth() {
    try {
      const res = await client.get('/get-post', { timeout: 4000 });
      return { online: true, data: res.data };
    } catch (err) {
      return { online: false, error: err.message };
    }
  },

  // Fetch all posts
  async getPosts() {
    try {
      const res = await client.get('/get-post');
      // Format: { message: "...", data: [...] }
      if (Array.isArray(res.data?.data)) {
        return res.data.data;
      }
      if (Array.isArray(res.data)) {
        return res.data;
      }
      return [];
    } catch (err) {
      console.error('Error fetching posts:', err);
      throw new Error(err.response?.data?.message || err.message || 'Failed to fetch posts');
    }
  },

  // Create a new post with image and caption
  async createPost({ imageFile, caption }, onProgress) {
    const formData = new FormData();
    formData.append('image', imageFile);
    if (caption !== undefined && caption !== null) {
      formData.append('caption', caption);
    }

    try {
      const res = await client.post('/create-post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(percentCompleted);
          }
        },
      });
      return res.data?.data || res.data;
    } catch (err) {
      console.error('Error creating post:', err);
      throw new Error(err.response?.data?.message || err.message || 'Failed to upload post');
    }
  },

  // Delete a post
  async deletePost(id) {
    try {
      const res = await client.delete(`/delete-post/${id}`);
      return res.data;
    } catch (err) {
      console.error(`Error deleting post ${id}:`, err);
      throw new Error(err.response?.data?.message || err.message || 'Failed to delete post');
    }
  },
};

export default api;
