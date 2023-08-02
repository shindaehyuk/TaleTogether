  import React, { useState } from "react";
  // import axios from "axios";
  import Grid from "@mui/material/Grid";
  import Box from "@mui/material/Box";
  import Button from "@mui/material/Button";
  import StoryPickerModal from "./StoryPickerModal";

  function PostForm({ list, setList, modeChanger }) {
    const [title, setTitle] = useState("");

    const [content, setContent] = useState("");

    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
      setModalOpen(true);
    };

    const handleModalClose = () => {
      setModalOpen(false);
    };

    function handleSubmit(event) {
      event.preventDefault();
      const payload = { title, content };
      setList((prevList) => [...prevList, payload]);
      modeChanger();
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
        <nav>
          <Button
            type="submit"
            sx={{ mt: "1rem", ml: "77%", backgroundColor: "d4a373" }}
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
              <h3>제목</h3>
              <label htmlFor="title"></label>
              <input
                type="text"
                name="title"
                value={title}
                style={{ width: "100%", fontSize: "2rem", height: "100%" }}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <hr />
            <div>
              <h3>내용</h3>
              <label htmlFor="content"></label>
              <textarea
                name="content"
                value={content}
                placeholder="내용을 입력해주세요"
                style={{ width: "100%", fontSize: "2rem", height: "100%" }}
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
                height: 300,
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
            ></Box>
            <Button variant="text" onClick={handleModalOpen}>
              동화 고르기
            </Button>
            <StoryPickerModal open={modalOpen} onClose={handleModalClose} />
          </Grid>
        </Grid>
      </form>
    );
  }

  export default PostForm;
