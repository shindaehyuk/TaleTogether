import React from "react";
import Post from "./Post";
import Button from "@mui/material/Button";
import "./Community.css";


function NavBar({ onButtonClick }) {
  return (
    <div>
      <Button
        className="button-orange"
        sx={{ mt: "1rem", ml: "77%", width: "7rem" }}
        variant="text"
        onClick={onButtonClick}
      >
        작성하기
      </Button>
      <hr />
    </div>
  );
}

function PostList({ onButtonClick, list }) {

  return (
    <div>
      <NavBar onButtonClick={onButtonClick}></NavBar>
      <div className="post-container">
        {list.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  );
}

export default PostList;
