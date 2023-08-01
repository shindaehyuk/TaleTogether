import React, { useEffect, useState } from "react";
import axios from "axios";

function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [list, setList] = useState([])

    function handleSubmit(event) {
    event.preventDefault();
    const payload = { title, content };
    setList(list.push(payload))
    console.log(list)
    // try {
    // //   await axios.post("https://api.example.com/posts", payload);
      
    //   setTitle("");
    //   setContent("");
    //   console.log("작성됨")
    // } catch (error) {
    //   console.error("Error creating post:", error);
    //   throw error;
    // }
  }

  return (
    <form onSubmit={handleSubmit}>
        <h3>Title</h3>
      <label htmlFor="title"></label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <label htmlFor="content">Content:</label>
      <textarea
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default PostForm;
