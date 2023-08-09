import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import getlikeTaleAxios from "../../../api/community/getlikeTaleAxios";
import LikeScroll from "./LikeScroll";

function Like() {
  const [myLikes, setMyLikes] = useState([]);

  const user = useSelector((state) => state.userSlice.userId);
  const props = { user };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getlikeTaleAxios(props);
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
        }}
      >
        <h2>내가 쓴 글</h2>
        <h2 style={{ marginLeft: "auto" }}>총 {myLikes.length}개의 게시글</h2>
      </Box>
      <LikeScroll myLikes={myLikes}></LikeScroll>
    </>
  );
}

export default Like;
