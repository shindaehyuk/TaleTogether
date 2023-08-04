import React from "react";
import PostCard from "./PostCard";
import "./Community.css";

function Post({ post }) {
  return (
    <div className="post-card-wrapper">
      <PostCard title={post.title} content={post.content} />
    </div>
  );
}

export default Post;
