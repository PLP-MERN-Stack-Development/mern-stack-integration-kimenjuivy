import { useState } from 'react';
import PostCard from './PostCard';
import { usePosts } from '../../hooks/usePosts';

const PostList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  
  const { posts, loading, error, pagination } = usePosts({ page, search, limit: 9 });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  if (loading) return <div className="loading">Loading posts...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="post-list-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="btn-search">Search</button>
      </form>

      <div className="post-grid">
        {posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          posts.map(post => <PostCard key={post._id} post={post} />)
        )}
      </div>

      {pagination.totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="btn-page"
          >
            Previous
          </button>
          <span className="page-info">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === pagination.totalPages}
            className="btn-page"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PostList;