import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import getlikeTaleAxios from "../../../api/community/getlikeTaleAxios";
import LikeScroll from "./LikeScroll";
import UserinfoAxios from "../../../api/auth/Get/UserinfoAxios";

function Like() {
  const [myLikes, setMyLikes] = useState([]);

  const user = async () => {
    const res = await UserinfoAxios();
  };
  useEffect(() => {
    user();
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getlikeTaleAxios();
        setMyLikes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);
  console.log(myLikes);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          width: "90%",
          marginTop: "2em",
          fontFamily: "omyu_pretty",
        }}
      >
        <h2>내가 좋아요 누른 글</h2>
        <h2 style={{ marginLeft: "auto" }}>총 {myLikes.length}개의 게시글</h2>
      </Box>
      <LikeScroll myLikes={myLikes}></LikeScroll>
    </>
  );
}

export default Like;
