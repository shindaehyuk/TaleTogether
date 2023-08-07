import * as React from 'react';
import Box from '@mui/material/Box';
import Nav from '../layouts/Nav';

function Main() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '90%',
          height: '90%',
          bgcolor: '#CCD5AE',
          borderRadius: '40px',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: 10,
        }}
      >
        <Nav></Nav>
      </Box>
    </>
  );
}

export default Main;
