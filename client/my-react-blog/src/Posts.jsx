import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostCard from './PostCard';

const PostsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setError(error.toString());
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error loading posts: {error}</div>;
  if (posts.length === 0) return <div>No posts to display</div>;

  return (
    <PostsContainer>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </PostsContainer>
  );
};

export default Posts;
