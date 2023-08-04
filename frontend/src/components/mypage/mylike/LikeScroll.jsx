import React from "react";
import "./Like.css";
import { Box } from "@mui/material";

const Scroll = ({ imagePaths, likes }) => {
  const Articles = likes.map((like, index) => ({
    image: imagePaths[index],
    like: like,
  }));

  return (
    <Box
      className="scroll"
      style={{
        width: "90%",
        height: "80%",
        overflowY: "scroll",
      }}
    >
      {Articles.map((article, index) => (
        <React.Fragment key={`article${index}`}>
          <Box
            key={`article${index}`}
            sx={{
              width: "100%",
              height: "60%",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <p>{article.like}</p>
            {article.image && (
              <img src={article.image} style={{ marginLeft: "auto" }} />
            )}
          </Box>
          <hr style={{ marginTop: "0px" }} />
        </React.Fragment>
      ))}
    </Box>
  );
};

export default Scroll;
