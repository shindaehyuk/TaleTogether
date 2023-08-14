import "./Article.css";
import { Box } from "@mui/material";
import React from "react";

const ArticleScroll = ({ myArticles }) => {
  console.log(myArticles);

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
              flexDirection: "column", // 추가
              justifyContent: "flex-start",
              alignItems: "flex-start",
              textColor: "inherit",
              indicatorColor: "inherit",
              fontFamily: "omyu_pretty",
            }}
          >
            <h2>{article.title}</h2>
            {article.taleTitleImage && (
              <img
                src={article.taleTitleImage}
                style={{
                  marginLeft: "auto",
                  alignSelf: "center",
                  borderRadius: "20px",
                }}
              />
            )}
            <p style={{ alignSelf: "flex-end" }}>좋아요 : {article.likes}</p>
          </Box>
          <hr style={{ marginBottom: "0px" }} />
        </React.Fragment>
      ))}
    </Box>
  );
};

export default ArticleScroll;
