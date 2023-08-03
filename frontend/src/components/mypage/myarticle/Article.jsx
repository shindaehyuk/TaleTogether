import Scroll from "./Scroll";
import { Box } from "@mui/material";

function Article() {
  const imagePaths = [
    "../../assets/snoopy.png",
    "../../assets/mine.png",
    "../../assets/mypage.png",
    "../../assets/snoopy.png",
    "../../assets/mine.png",
  ];

  const stories = [
    "재미있어요",
    "무서워요",
    "집에갈래요",
    "오늘 점심",
    "뭐먹지",
    "저녁은?",
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          width: "90%",
          marginTop: "2em",
        }}
      >
        <h2>내가 쓴 글</h2>
        <h2 style={{ marginLeft: "auto" }}>총 {stories.length}개의 게시글</h2>
      </Box>
      <Scroll imagePaths={imagePaths} stories={stories}></Scroll>
    </>
  );
}

export default Article;
