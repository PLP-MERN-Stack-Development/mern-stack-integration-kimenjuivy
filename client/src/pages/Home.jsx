import { useAuth } from '../hooks/useAuth';
import PostList from '../components/Post/PostList';
import OnboardingGuide from '../components/Layout/OnboardingGuide';
import Landing from './Landing';

const Home = () => {
  const { user } = useAuth();

  if (!user) {
    return <Landing />;
  }

  return (
    <div className="home">
      <OnboardingGuide />
      <h1>Latest Blog Posts</h1>
      <PostList />
    </div>
  );
};

export default Home;