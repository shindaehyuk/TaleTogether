import ArticleScroll from "./ArticleScroll";
import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import getUserCommunityAxios from "../../../api/community/getUserCommunityAxios";
import { useSelector } from "react-redux";

function Article() {
  const [myArticles, setMyArticles] = useState([]);

  const user = useSelector((state) => state.userSlice.userId);
  const props = { user };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getUserCommunityAxios(props);
        setMyArticles(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);
  console.log(myArticles);

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
        <h2 style={{ marginLeft: "auto" }}>
          총 {myArticles.length}개의 게시글
        </h2>
      </Box>
      <ArticleScroll myArticles={myArticles}></ArticleScroll>
    </>
  );
}

export default Article;
