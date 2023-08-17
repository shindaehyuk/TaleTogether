import React, { useState, useEffect } from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";
import allCommunityAxios from "../../api/community/allCommunityAxios";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Button } from "@mui/material";

function Community() {
  const [mode, setMode] = useState("default");
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchAllPosts() {
      const response = await allCommunityAxios({ page: currentPage });

      if (response) {
        setList(response.data);
        if (response.data) {
          const communityCount = response.data[0].communityCount;
          const totalPages =
            Math.floor(communityCount / 9) + (communityCount % 9 === 0 ? 0 : 1);
          setTotalPages(totalPages);
        } else {
          setTotalPages(1);
        }
      } else {
        console.error("Failed to fetch posts");
      }
    }

    fetchAllPosts();
  }, [currentPage]);

  const setCreate = () => {
    setMode("create");
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage === 0 ? prevPage : prevPage - 1));
  };

  const renderPageButtons = () => {
    const buttons = [];

    const visiblePages = Math.min(totalPages, 5);
    const middle = Math.floor(visiblePages / 2);
    const isStart = currentPage <= middle;
    const isEnd = currentPage >= totalPages - (middle + 1);
    const startPage = isStart
      ? 0
      : isEnd
      ? totalPages - visiblePages
      : currentPage - middle;
    const endPage = startPage + visiblePages;

    if (currentPage !== 0) {
      buttons.push(
        <SkipPreviousIcon
          style={{ cursor: "pointer" }}
          key="first"
          onClick={() => setCurrentPage(0)}
        >
          처음
        </SkipPreviousIcon>,
        <ArrowLeftIcon
          style={{ cursor: "pointer" }}
          key="prev"
          onClick={prevPage}
        >
          이전
        </ArrowLeftIcon>
      );
    }

    for (let i = startPage; i < endPage; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i + 1}
        </Button>
      );
    }

    if (currentPage !== totalPages - 1 && totalPages > 1) {
      buttons.push(
        <ArrowRightIcon
          style={{ cursor: "pointer" }}
          key="next"
          onClick={nextPage}
        >
          다음
        </ArrowRightIcon>,
        <SkipNextIcon
          style={{ cursor: "pointer" }}
          key="last"
          onClick={() => setCurrentPage(totalPages - 1)}
        >
          끝
        </SkipNextIcon>
      );
    }

    return buttons;
  };

  const content =
    mode === "default" ? (
      <>
        <PostList onButtonClick={setCreate} list={list} />
        {renderPageButtons()}
      </>
    ) : (
      <PostForm
        list={list}
        setList={setList}
        modeChanger={() => setMode("default")}
      />
    );

  return <div>{content}</div>;
}

export default Community;
