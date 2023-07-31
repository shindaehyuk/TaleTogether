import * as React from 'react';
import Box from '@mui/material/Box';
import './Game.css';

export default function Game() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          className="Box"
          sx={{
            width: '400px',
            height: '400px',
            margin: '10%',
            backgroundImage: "url('../../assets/joinFox.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            borderRadius: '20px',
            backgroundPosition: 'center', // 이미지를 가운데에 맞춰 보이도록 설정
            boxShadow: 5,
          }}
        >
          <p class="title">card title</p>
          <div class="overlay"></div>
          <div class="button">
            <a href="#"> BUTTON </a>
          </div>
        </Box>
        <Box
          className="Box"
          sx={{
            width: '400px',
            height: '400px',
            margin: '10%',
            backgroundImage: "url('../../assets/makeFox.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            borderRadius: '20px',
            backgroundPosition: 'center', // 이미지를 가운데에 맞춰 보이도록 설정
            boxShadow: 5,
          }}
        >
          <p class="title">card title</p>
          <div class="overlay"></div>
          <div class="button">
            <a href="#"> BUTTON </a>
          </div>
        </Box>
      </Box>
    </>
  );
}
