function Post({ post }) {
  return (
    <div>
      <h4>{post.title}</h4>
      <p>{post.content}</p>
    </div>
  );
}

export default Post;
