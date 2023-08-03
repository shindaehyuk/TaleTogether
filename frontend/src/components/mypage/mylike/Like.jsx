import Scroll from "./LikeScroll";
import { Box } from "@mui/material";

function Like() {
  const imagePaths = [
    "../../assets/forest.jpg",
    "../../assets/makeFox.png",
    "../../assets/joinFox.png",
    "../../assets/snoopy.png",
    "../../assets/mine.png",
  ];

  const likes = [
    "너무좋아요",
    "좋아좋아",
    "원숭이",
    "나무에",
    "올라가",
    "몽키매직?",
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
        <h2>내가 좋아요 누른 게시글</h2>
        <h2 style={{ marginLeft: "auto" }}>총 {likes.length}개의 게시글</h2>
      </Box>
      <Scroll imagePaths={imagePaths} likes={likes}></Scroll>
    </>
  );
}

export default Like;
