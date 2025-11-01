import { useState, useEffect } from 'react';
import { categoriesAPI } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

const CategoryList = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getCategories();
      setCategories(response.data);
    } catch (err) {
      console.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setEditingId(category._id);
    setEditData({ name: category.name, description: category.description });
  };

  const handleUpdate = async (id) => {
    try {
      await categoriesAPI.updateCategory(id, editData);
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      alert('Failed to update category');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this category?')) {
      try {
        await categoriesAPI.deleteCategory(id);
        fetchCategories();
      } catch (err) {
        alert('Failed to delete category');
      }
    }
  };

  if (loading) return <div>Loading categories...</div>;

  return (
    <div className="category-list">
      {categories.length === 0 ? (
        <p>No categories yet.</p>
      ) : (
        categories.map(category => (
          <div key={category._id} className="category-item">
            {editingId === category._id ? (
              <div className="category-edit">
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  placeholder="Category name"
                />
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  placeholder="Description"
                />
                <button onClick={() => handleUpdate(category._id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <div className="category-info">
                  <h3>{category.name}</h3>
                  {category.description && <p>{category.description}</p>}
                </div>
                {user && (
                  <div className="category-actions">
                    <button onClick={() => handleEdit(category)}>Edit</button>
                    <button onClick={() => handleDelete(category._id)}>Delete</button>
                  </div>
                )}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CategoryList;