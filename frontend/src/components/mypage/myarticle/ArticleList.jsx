import ArticleListItem from "./ArticleListItem";
import getCommunityAxios from "../../../api/community/getCommunityAxios";
import { useState, useEffect } from "react";

const ArticleList = () => {
  const [articleAll, setArticleAll] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getCommunityAxios("all");
        setArticleAll(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const myArticle = articleAll.filter((article) => article.userId === userId);

  return (
    <>
      {myArticle.map((article) => (
        <ArticleListItem key={article.id} article={article} />
      ))}
    </>
  );
};

export default ArticleList;
