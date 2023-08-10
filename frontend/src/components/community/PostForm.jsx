import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import StoryPickerModal from "./StoryPickerModal";
import "./Community.css";
import { useSelector } from "react-redux";
import postCommunityAxios from "../../api/community/postCommunityAxios";

function PostForm({ list, setList, modeChanger }) {
  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  // payload를 통해 axios넘겨줄 데이터
  const [selectedImage, setSelectedImage] = useState(null);
  const [taleId, setTaleId] = useState("");
  const [taleTitle, setTaleTitle] = useState("");

  // userId 가져오기
  const userId = useSelector((state) => state.userSlice.userId);

  // 동화목록 가져오기
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSelectImage = (src, id, title) => {
    setSelectedImage(src);
    setTaleId(id);
    setTaleTitle(title);
  };
  
  async function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
  
    const payload = {
      title,
      content,
      img: selectedImage,
      userId,
      taleId,
      taleTitle,
    };
  
    const response = await postCommunityAxios(payload);
    if (response) {
      const newPost = response.data;
      console.log(newPost)
      setList((prevList) => [...prevList, newPost]);
    } else {
      // 서버 측에서 게시물 저장에 실패한 경우에 대한 처리를 추가합니다.
      console.log(payload )
    }
  
    modeChanger();
  }

  return (
    <form onSubmit={handleSubmit}>
      <nav>
        <Button
          type="submit"
          sx={{ mt: "1rem", ml: "77%", width: "7rem" }}
          className="button-green"
        >
          작성완료
        </Button>
      </nav>
      <hr />
      <Grid container justifyContent="" spacing={1} sx={{}}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="space-around"
          item
          xs={8}
        >
          <div>
            <h3 style={{ marginRight: "70vh" }}>
              <b>제목</b>
            </h3>
            <label htmlFor="title"></label>
            <input
              type="text"
              name="title"
              value={title}
              style={{ width: "80vh", fontSize: "2rem", height: "10vh" }}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <hr />
          <div>
            <h3 style={{ marginRight: "70vh" }}>
              <b>내용</b>
            </h3>
            <label htmlFor="content"></label>
            <textarea
              name="content"
              value={content}
              placeholder="내용을 입력해주세요"
              style={{
                width: "80vh",
                fontSize: "2rem",
                height: "35vh",
                resize: "none",
              }}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <br />
        </Grid>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          item
          xs={4}
        >
          <Box
            sx={{
              width: [80, 150, 180, 250], // 100 for mobile, 150 for tablet, 200 for desktop
              height: 330,
              backgroundColor: "primary.dark",
              "&:hover": {
                backgroundColor: "primary.main",
                opacity: 1,
              },
              "@media (hover:hover)": {
                "&:hover": {
                  opacity: [0.9, 0.8, 0.7],
                },
              },
            }}
            style={{
              backgroundImage: selectedImage ? `url(${selectedImage})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></Box>

          <Button
            variant="text"
            onClick={handleModalOpen}
            className="button-orange"
            sx={{ width: "10rem", mt: "1rem" }}
          >
            동화 고르기
          </Button>
          <StoryPickerModal
            open={modalOpen}
            onClose={handleModalClose}
            onSelectImage={handleSelectImage}
            userId={userId}
          />
        </Grid>
      </Grid>
    </form>
  );
}

export default PostForm;
