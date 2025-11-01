import PostList from '../components/Post/PostList';

const Home = () => {
  return (
    <div className="home">
      <h1>Latest Blog Posts</h1>
      <PostList />
    </div>
  );
};

export default Home;