import React, { useState } from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";

function Community() {
  const [mode, setMode] = useState("default");
  const [list, setList] = useState([]);

  const setCreate = () => {
    setMode("create");
  };

  const content =
    mode === "default" ? (
      <PostList onButtonClick={setCreate} list={list} />
    ) : (
      <PostForm
        list={list}
        setList={setList}
        modeChanger={() => setMode("default")}
      />
    );

  return <div>{content}</div>;
}

export default Community;
