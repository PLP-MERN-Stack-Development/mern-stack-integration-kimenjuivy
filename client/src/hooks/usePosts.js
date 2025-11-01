import { useState, useEffect } from 'react';
import { postsAPI } from '../services/api';

export const usePosts = (params = {}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0
  });

  useEffect(() => {
    fetchPosts();
  }, [JSON.stringify(params)]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await postsAPI.getPosts(params);
      setPosts(response.data.posts);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        totalPosts: response.data.totalPosts
      });
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchPosts();
  };

  return { posts, loading, error, pagination, refetch };
};