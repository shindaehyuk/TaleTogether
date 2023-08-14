import ArticleScroll from './ArticleScroll';
import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import getUserCommunityAxios from '../../../api/community/getUserCommunityAxios';
import UserinfoAxios from '../../../api/auth/Get/UserinfoAxios';
import getDetailAxios from '../../../api/community/getDetailAxios';

function Article() {
  const [myArticles, setMyArticles] = useState([]);

  const [userId, setUserId] = useState('');

  const user = async () => {
    const res = await UserinfoAxios();
    setUserId(res.data.userId);
  };
  useEffect(() => {
    user();
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getDetailAxios();
        setMyArticles(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);
  console.log(myArticles);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          width: '90%',
          marginTop: '2em',
          fontFamily: 'omyu_pretty',
        }}
      >
        <h2>내가 쓴 글</h2>
        <h2 style={{ marginLeft: 'auto' }}>총 {myArticles.length}개의 게시글</h2>
      </Box>
      <ArticleScroll myArticles={myArticles}></ArticleScroll>
    </>
  );
}

export default Article;
