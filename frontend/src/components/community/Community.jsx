import React, { useState, useEffect } from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";
import allCommunityAxios from "../../api/community/allCommunityAxios";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Button } from "@mui/material";
import nopost from "./src/nopost.png";

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
        if (response.data && response.data.length > 0) {
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

    const visiblePages = totalPages > 1 ? Math.min(totalPages, 5) : totalPages;
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
        />,
        <ArrowLeftIcon
          style={{ cursor: "pointer" }}
          key="prev"
          onClick={prevPage}
        />
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
        />,
        <SkipNextIcon
          style={{ cursor: "pointer" }}
          key="last"
          onClick={() => setCurrentPage(totalPages - 1)}
        />
      );
    }

    return buttons;
  };

  const content =
    mode === "default" ? (
      <>
        {list.length > 0 ? (
          <>
            <PostList onButtonClick={setCreate} list={list} />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <div>{renderPageButtons().slice(0, 2)}</div>
              <div>{renderPageButtons().slice(2, -2)}</div>
              <div>{renderPageButtons().slice(-2)}</div>
            </div>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={nopost} alt="" />
            <Button
              style={{ color: "white", backgroundColor: "#D0A370" }}
              onClick={setCreate}
            >
              새 게시글 작성하기
            </Button>
          </div>
        )}
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
