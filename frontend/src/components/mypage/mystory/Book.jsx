import React, { useState, useEffect, useRef } from "react";
import "./Book.css";

const Book = ({ pageList }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const pageRefs = useRef([]);

  const [backgroundImage, setBackgroundImage] = useState(pageList[0].image);

  useEffect(() => {
    pageRefs.current = pageRefs.current.slice(0, pageList.length);
  }, [pageList]);

  const handleClick = (event) => {
    const bookRect = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bookRect.left + bookRect.width / 2) {
      // Click on the left side of the book
      if (currentPageIndex > 0) {
        setCurrentPageIndex(currentPageIndex - 1);
        setBackgroundImage(pageList[currentPageIndex - 1].image);
      }
    } else {
      // Click on the right side of the book
      if (currentPageIndex < pageList.length - 1) {
        setCurrentPageIndex(currentPageIndex + 1);
        setBackgroundImage(pageList[currentPageIndex + 1].image);
      }
    }
  };

  return (
    <div
      id="book"
      onClick={handleClick}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "100% 100%",
      }}
    >
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
            <span>{page.content}</span>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Book;
