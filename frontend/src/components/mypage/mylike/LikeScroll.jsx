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
              justifyContent: "flex-start",
              textColor: "inherit",
              indicatorColor: "inherit",
            }}
          >
            <p>{like.title}</p>
            <p>{like.content}</p>
            {like.taleImage && (
              <img src={like.taleImage} style={{ marginLeft: "auto" }} />
            )}
          </Box>
          <hr style={{ marginBottom: "0px" }} />
        </React.Fragment>
      ))}
    </Box>
  );
};

export default LikeScroll;
