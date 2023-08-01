import React from 'react';
import Carousel from './Carousel'; // Carousel 컴포넌트 파일 경로
import { Grid } from '@mui/material';
import { Box } from '@mui/material';

const MyPage = () => {
  return (
    <>
      <h1>My Page</h1>
      <Grid container spacing={1}>
        <Grid
          container
          item xs={4}
          justifyContent="center"
        >
          <Box
            sx={{
              backgroundColor: "#CCD5AE",
              border: "1px solid black",
              width: "70%",
              height: "55%",
            }}
            >

          </Box>
        </Grid>
        <Grid item xs={8}>
          <Carousel />
        </Grid>
      </Grid>
    </>
  );
};

export default MyPage;