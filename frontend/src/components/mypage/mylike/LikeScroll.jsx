import "./Like.css";
import { Box } from "@mui/material";
import React from "react";

const LikeScroll = ({ myLikes }) => {
  return (
    <Box
      className="no-scroll"
      style={{
        width: "90%",
        height: "80%",
        overflowY: "scroll",
      }}
    >
      {myLikes.map((like, index) => (
        <React.Fragment key={`like${index}`}>
          <Box
            sx={{
              width: "100%",
              height: "60%",
              display: "flex",
              flexDirection: "column", // 추가
              justifyContent: "flex-start",
              alignItems: "flex-start",
              textColor: "inherit",
              indicatorColor: "inherit",
              fontFamily: "omyu_pretty",
            }}
          >
            <h2>{like.title}</h2>
            {like.taleImage && (
              <img
                src={like.taleImage}
                style={{
                  marginLeft: "auto",
                  alignSelf: "center",
                  borderRadius: "20px",
                }}
              />
            )}
            <p style={{ alignSelf: "flex-end" }}>좋아요 : {like.likeCount}</p>
          </Box>
          <hr style={{ marginBottom: "0px" }} />
        </React.Fragment>
      ))}
    </Box>
  );
};

export default LikeScroll;
