import React from "react";
import "./Article.css";
import { Box } from "@mui/material";

const Scroll = ({ imagePaths, stories }) => {
  const Articles = stories.map((story, index) => ({
    image: imagePaths[index],
    story: story,
  }));

  return (
    <Box
      className="no-scroll"
      style={{
        width: "90%",
        height: "80%",
        overflowY: "scroll",
      }}
    >
      {Articles.map((article, index) => (
        <React.Fragment key={`article${index}`}>
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
            <p>{article.story}</p>
            {article.image && (
              <img src={article.image} style={{ marginLeft: "auto" }} />
            )}
          </Box>
          <hr style={{ marginBottom: "0px" }} />
        </React.Fragment>
      ))}
    </Box>
  );
};

export default Scroll;
