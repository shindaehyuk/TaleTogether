import "./Article.css";
import { Box } from "@mui/material";
import React from "react";

const ArticleScroll = ({ myArticles }) => {
  return (
    <Box
      className="no-scroll"
      style={{
        width: "90%",
        height: "80%",
        overflowY: "scroll",
      }}
    >
      {myArticles.map((article, index) => (
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
            <p>{article.title}</p>
            <p>{article.content}</p>
            {article.taleTitleImage && (
              <img
                src={article.taleTitleImage}
                style={{ marginLeft: "auto" }}
              />
            )}
          </Box>
          <hr style={{ marginBottom: "0px" }} />
        </React.Fragment>
      ))}
    </Box>
  );
};

export default ArticleScroll;
