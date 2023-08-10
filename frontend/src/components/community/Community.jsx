import React, { useState, useEffect } from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";
import allCommunityAxios from "../../api/community/allCommunityAxios";

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
        if (response.pageInfo) {
            setTotalPages(response.pageInfo.total_pages);
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
    const startPage = Math.max(0, currentPage - Math.floor(visiblePages / 2));
    const endPage = startPage + visiblePages;

    for (let i = startPage; i < endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i + 1}
        </button>
      );
    }

    return buttons;
  }

  const content =
    mode === "default" ? (
      <>
        <PostList onButtonClick={setCreate} list={list} />
        {currentPage > 0 && <button onClick={prevPage}>Previous Page</button>}
        {renderPageButtons()}
        {currentPage < totalPages - 1 && <button onClick={nextPage}>Next Page</button>}
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
