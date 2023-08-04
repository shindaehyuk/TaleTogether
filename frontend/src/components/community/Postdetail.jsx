import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PostDetail() {
  const [post, setPost] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    // get the individual post using postId from the URL
    // assuming your API endpoint looks like: https://api.example.com/post/:postId
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`https://api.example.com/post/${postId}`);
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
        throw error;
      }
    }

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

export default PostDetail;
