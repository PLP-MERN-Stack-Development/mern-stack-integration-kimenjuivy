import { useParams } from 'react-router-dom';
import PostForm from '../components/Post/PostForm';

const EditPost = () => {
  const { id } = useParams();

  return (
    <div className="edit-post-page">
      <h1>Edit Post</h1>
      <PostForm postId={id} />
    </div>
  );
};

export default EditPost;