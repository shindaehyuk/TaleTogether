import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import StoryPickerModal from "./StoryPickerModal";
import "./Community.css";
import postCommunityAxios from "../../api/community/postCommunityAxios";
import putCommunityAxios from "../../api/community/putCommunityAxios";
import UserinfoAxios from "../../api/auth/Get/UserinfoAxios";

function PostForm({
  list,
  setList,
  modeChanger,
  initialValues = {},
  setEditing,
}) {
  // payload를 통해 axios넘겨줄 데이터
  const [title, setTitle] = useState(initialValues?.title || "");
  const [content, setContent] = useState(initialValues?.content || "");
  const [taleId, setTaleId] = useState(initialValues?.taleId || null);

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const [taleTitle, setTaleTitle] = useState("");

  // userId 가져오기
  const [userId, setUserId] = useState("");

  const user = async () => {
    const res = await UserinfoAxios();
    setUserId(res.data.userId);
  };
  useEffect(() => {
    user();
  });

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

  async function postSubmit(event) {
    event.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    if (!taleId) {
      alert("동화를 골라주세요.");
      return;
    }

    const payload = {
      title,
      content,
      userId,
      taleId,
    };

    const response = await postCommunityAxios(payload);
    if (response) {
      const newPost = response.data;
      setList((prevList) => [...prevList, newPost]);
    } else {
    }

    modeChanger();
  }

  async function putSubmit(event) {
    event.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    if (!taleId) {
      alert("동화를 골라주세요.");
      return;
    }

    const payload = {
      title,
      content,
      userId,
      taleId,
    };

    const response = await putCommunityAxios({
      ...payload,
      communityId: initialValues.communityId,
    });

    if (response) {
      setEditing(false);
    } else {
      // 실패한 경우 오류 처리
    }
  }
  const handleSubmit = initialValues.communityId
    ? (e) => putSubmit(e)
    : (e) => postSubmit(e);

  return (
    <form onSubmit={handleSubmit}>
      <nav>
        <Button
          type="submit"
          sx={{ mt: "1rem", ml: "77%", width: "7rem" }}
          className="button-green"
          onClick={handleSubmit}
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
