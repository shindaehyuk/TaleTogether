import React from "react";
import Post from "./Post";
import Button from "@mui/material/Button";
import getTaleAllAxios from "../../api/tale/getTaleAll";
import "./Community.css";

function NavBar({ onButtonClick }) {
  return (
    <div>
      <Button
        className="button-orange"
        sx={{ mt: '1rem', ml: '77%', width: '7rem' }}
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
  const handleButtonClick = async () => {
    const tales = await getTaleAllAxios(); // 추가 : 동화 목록을 가져옵니다.
    if (tales && tales.length === 0) {
      alert('동화를 만들어주세요.'); // 추가 : 동화의 수가 0개인 경우 알림을 띄웁니다.
    } else {
      onButtonClick();
    }
  };

  return (
    <div>
      <NavBar onButtonClick={handleButtonClick}></NavBar>
      <div className="post-container">
        {list.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  );
}

export default PostList;
