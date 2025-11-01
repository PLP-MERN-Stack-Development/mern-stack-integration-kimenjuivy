import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postsAPI, categoriesAPI } from '../../services/api';

const PostForm = ({ postId }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    published: true
  });
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getCategories();
      setCategories(response.data);
    } catch (err) {
      console.error('Failed to fetch categories');
    }
  };

  const fetchPost = async () => {
    try {
      const response = await postsAPI.getPost(postId);
      setFormData({
        title: response.data.title,
        content: response.data.content,
        category: response.data.category._id,
        published: response.data.published
      });
    } catch (err) {
      setError('Failed to fetch post');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const submitData = { ...formData };
      if (image) {
        submitData.image = image;
      }

      if (postId) {
        await postsAPI.updatePost(postId, submitData);
      } else {
        await postsAPI.createPost(submitData);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      {error && <div className="error">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows="10"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="image">Featured Image</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      <div className="form-group checkbox">
        <label>
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleChange}
          />
          Published
        </label>
      </div>

      <button type="submit" disabled={loading} className="btn-submit">
        {loading ? 'Saving...' : postId ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
};

export default PostForm;