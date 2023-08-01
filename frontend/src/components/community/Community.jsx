import Button from "@mui/material/Button";
import "./Community.css";
import PostForm from "./PostForm";
import PostList from "./PostList";
import { useState } from "react";

function NavBar({ onButtonClick }) {
  return (
    <div>
      <Button className="button-create" variant="text" onClick={onButtonClick}>
        작성하기
      </Button>
      <hr />
    </div>
  );
}


function Community() {
  let content = null;
  const [mode, setMode] = useState("default");

  const setCreate = () => {
    setMode("create");
  };

  if (mode === "default") {
    content = <PostList />;
  } else if (mode === "create") {
    content = <PostForm />;
  }

  return (
    <div>
      <NavBar onButtonClick={setCreate}></NavBar>
      {content}
    </div>
  );
}

export default Community;
