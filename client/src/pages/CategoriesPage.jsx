import { useState } from 'react';
import CategoryList from '../components/Category/CategoryList';
import CategoryForm from '../components/Category/CategoryForm';

const CategoriesPage = () => {
  const [refresh, setRefresh] = useState(0);

  const handleCategoryCreated = () => {
    setRefresh(prev => prev + 1);
  };

  return (
    <div className="categories-page">
      <h1>Manage Categories</h1>
      <CategoryForm onCategoryCreated={handleCategoryCreated} />
      <CategoryList key={refresh} />
    </div>
  );
};

export default CategoriesPage;