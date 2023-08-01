import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const { data } = await axios.get('https://api.example.com/posts');
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  return (
    <div>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
