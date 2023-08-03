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
        border: "1px solid black",
      }}
    >
      {Articles.map((article, index) => (
        <>
          <Box
            key={`article${index}`}
            sx={{
              width: "100%",
              height: "50%",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <p>{article.like}</p>
            {article.image && (
              <img src={article.image} style={{ marginLeft: "auto" }} />
            )}
          </Box>
          <hr style={{ marginBottom: "0px" }} />
        </>
      ))}
    </Box>
  );
};

export default Scroll;
