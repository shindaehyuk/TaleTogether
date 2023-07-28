import * as React from 'react';
import Box from '@mui/material/Box';
import CommunityButton from './CommunityButton';
import GameButton from './GameButton';
import MainButton from './MainButton';
import MyButton from './MypageButton';
import { Link } from 'react-router-dom';

export default function Intro() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundImage: "url('../../assets/Layerbg.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          borderBottomLeftRadius: '61px',
          borderBottomRightRadius: '61px',
          backgroundPosition: 'center', // 이미지를 가운데에 맞춰 보이도록 설정
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '95%',
            height: '90%',
            backgroundImage: "url('../../assets/Layerbg2.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'conver',
            borderBottomLeftRadius: '61px',
            borderBottomRightRadius: '61px',
            backgroundPosition: 'center', // 이미지를 가운데에 맞춰 보이도록 설정
          }}
        ></Box>
      </Box>
    </>
  );
}
