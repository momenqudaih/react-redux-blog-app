import { useSelector, useDispatch } from 'react-redux';
import {
  selectAllPosts,
  selectPostsStatus,
  selectPostsError,
  fetchPosts,
} from './postsSlice';
import PostsExerpt from './PostsExerpt';

import { useEffect } from 'react';

const PostsList = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  let content;
  if (postsStatus === 'loading') {
    content = <p>"Loading..."</p>;
  } else if (postsStatus === 'succeeded') {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostsExerpt key={post.id} post={post} />
    ));
  } else if (postsStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
