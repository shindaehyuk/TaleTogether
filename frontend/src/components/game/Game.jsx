import * as React from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';

import './Game.css';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';

export default function Game() {
  const navigate = useNavigate();
  const theme = createTheme({
    palette: {
      white: {
        main: '#FFFFFF',
      },
    },
    typography: {
      fontFamily: ['omyu_pretty'],
    },
  });

  const entranceHandler = (e) => {
    e.preventDefault();
    console.log(code);
    navigate('/webrtc', { state: code });
  };

  const codeHandler = (e) => {
    setCode(e.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [code, setCode] = useState('');

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

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
            width: '450px',
            height: '450px',
            backgroundImage: "url('../../assets/joinFox.png')",
            backgroundSize: 'cover',
            borderRadius: '20px',
            boxShadow: 5,
            marginRight: '5%',
          }}
        >
          <p class="title">같이하기</p>
          <div class="overlay"></div>
          <div class="button">
            <ThemeProvider theme={theme}>
              <Button
                onClick={handleOpen}
                variant="outlined"
                color="white"
                sx={{ width: '50%', height: '20%', fontSize: '20px' }}
              >
                <Typography variant="h4">코드 입력하기</Typography>
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    코드를 입력하세요
                  </Typography>
                  <form onSubmit={entranceHandler}>
                    <input type="text" value={code} onChange={codeHandler} />
                    <button type="submit">입장</button>
                  </form>
                </Box>
              </Modal>
            </ThemeProvider>
          </div>
        </Box>

        <Box
          className="Box"
          sx={{
            width: '450px',
            height: '450px',
            backgroundImage: "url('../../assets/makeFox.png')",
            backgroundSize: 'cover',
            borderRadius: '20px',
            boxShadow: 5,
            marginLeft: '5%',
          }}
        >
          <p class="title">방만들기</p>
          <div class="overlay"></div>
          <div class="button">
            <ThemeProvider theme={theme}>
              <Button variant="outlined" color="white" sx={{ width: '50%', height: '20%', fontSize: '20px' }}>
                <Typography variant="h4">게임시작</Typography>
              </Button>
            </ThemeProvider>
          </div>
        </Box>
      </Box>
    </>
  );
}
