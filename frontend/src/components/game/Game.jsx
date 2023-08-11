import * as React from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';

import './Game.css';
import makeGameAxios from '../../api/gameroom/makeGameAxios';
import entranceGamxAxios from '../../api/gameroom/entranceGameAxios';
import createSessionAxios from "../../api/CreateSessionAxios";

export default function Game() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [code, setCode] = useState('');

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

  const makeRoomHandler = async () => {
    // const res = await createSessionAxios();
    const res = await makeGameAxios();
    const code = res.data.sessionId;
    const taleId = res.data.taleId;
    navigate(`/webrtc/${code}`, { state: { code, owner: true, taleId } });
  };

  const entranceHandler = async (e) => {
    e.preventDefault();
    const res = await entranceGamxAxios(code);
    const taleId = res.data.taleId;

    navigate(`/webrtc/${code}`, { state: { code, owner: false, taleId } });
  };

  const codeHandler = (e) => {
    setCode(e.target.value);
  };

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
            width: '40%',
            height: '80%',
            backgroundImage: "url('../../assets/joinFox.png')",
            backgroundSize: 'cover',
            borderRadius: '20px',
            boxShadow: 20,
            marginRight: '5%',
            backgroundPosition: 'center',
          }}
        >
          <div className="title">같이하기</div>
          <div className="overlay"></div>
          <div className="button">
            <ThemeProvider theme={theme}>
              <Button onClick={handleOpen} variant="outlined" color="white" sx={{ fontSize: '20px' }}>
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
            width: '40%',
            height: '80%',
            backgroundImage: "url('../../assets/makeFox.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '20px',
            boxShadow: 20,
            marginLeft: '5%',
          }}
        >
          <div className="title">방만들기</div>
          <div className="overlay"></div>
          <div className="button">
            <ThemeProvider theme={theme}>
              <Button variant="outlined" onClick={makeRoomHandler} color="white" sx={{ fontSize: '20px' }}>
                <Typography variant="h4">게임시작</Typography>
              </Button>
            </ThemeProvider>
          </div>
        </Box>
      </Box>
    </>
  );
}
