import * as React from 'react';
import Box from '@mui/material/Box';

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
          borderBottomLeftRadius: '40px',
          borderBottomRightRadius: '40px',
          borderTopRightRadius: '40px',
          backgroundPosition: 'center', // 이미지를 가운데에 맞춰 보이도록 설정
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '80%',
            height: '56.25%',
            overflow: 'hidden',
            backgroundImage: "url('../../assets/Layerbg2.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            borderRadius: '40px',
            backgroundPosition: 'center', // 이미지를 가운데에 맞춰 보이도록 설정
          }}
        ></Box>
      </Box>
    </>
  );
}
