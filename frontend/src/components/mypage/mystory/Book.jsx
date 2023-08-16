import React, { useState, useEffect, useRef } from "react";
import "./Book.css";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";

const Book = ({ pageList }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const pageRefs = useRef([]);
  const [backgroundImage, setBackgroundImage] = useState(pageList[0].image);

  const theme = createTheme({
    typography: {
      fontFamily: ["yg-jalnan"],
    },
  });

  useEffect(() => {
    pageRefs.current = pageRefs.current.slice(0, pageList.length);
  }, [pageList]);

  const handleClick = (event) => {
    const bookRect = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bookRect.left + bookRect.width / 2) {
      // 왼쪽을 클릭했을 때
      if (currentPageIndex > 0) {
        setCurrentPageIndex(currentPageIndex - 1);
        setBackgroundImage(pageList[currentPageIndex - 1].image);
      }
    } else {
      // 오른쪽을 클릭했을 때
      if (currentPageIndex < pageList.length - 1) {
        setCurrentPageIndex(currentPageIndex + 1);
        setBackgroundImage(pageList[currentPageIndex + 1].image);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div id="book" onClick={handleClick}>
        <div
          key={backgroundImage}
          className="bookBackground fade-in"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            height: "100%",
            width: "500px",
            position: "absolute",
            marginLeft: "0px",
            bottom: 0,
            left: "-5%",
            borderRadius: "20px",
          }}
        ></div>
        <section id="pageSection">
          {pageList.map((page, index) => (
            <div
              key={index}
              ref={(el) => (pageRefs.current[index] = el)}
              className={`page ${
                index === currentPageIndex ? "page-active" : ""
              }`}
              style={{
                transform:
                  index >= currentPageIndex ? "rotateY(0)" : "rotateY(-180deg)",
              }}
            >
              <div className="page-content">
                <Box
                  className="scroll"
                  style={{
                    width: "100%",
                    height: "100%",
                    overflowY: "scroll",
                  }}
                >
                  {page.content}
                </Box>
              </div>
            </div>
          ))}
        </section>
      </div>
    </ThemeProvider>
  );
};

export default Book;
