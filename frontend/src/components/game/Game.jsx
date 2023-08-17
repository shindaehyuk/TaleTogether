import * as React from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';

import './Game.css';
import makeGameAxios from '../../api/gameroom/makeGameAxios';
import entranceGamxAxios from '../../api/gameroom/entranceGameAxios';
import 'animate.css';

export default function Game() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [code, setCode] = useState('');
  const [page, setPage] = useState(true);

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
    const res = await makeGameAxios();
    console.log(res);
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

  const pagehandler = (e) => {
    setPage(!page);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'white',
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: 'url(../../assets/Layerbg.png)',
          backgroundSize: 'contain',
          borderRadius: '40px',
          backgroundColor: '#d4a373',
        }}
      >
        <main className="main">
          <Box
            sx={{
              width: '50%',
              height: '50%',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <h2 className="animate__animated animate__fadeInLeft animate__delay-0.5s">함께 만들어가는 이야기</h2>
            <h1 className="animate__animated animate__fadeInLeft animate__delay-1s">Tale Together</h1>
            <img
              className="animate__animated animate__fadeInLeft animate__delay-1s"
              style={{ width: '50%', backgroundColor: 'inherit' }}
              src="../../assets/removebg-preview.png"
              alt=""
            ></img>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}></Box>
          </Box>
          <Box
            className="animate__animated animate__fadeIn animate__delay-2s"
            sx={{
              width: '50%',
              height: '80%',
              marginRight: '10%',
              color: 'black',
              boxShadow: 20,
              borderRadius: '20px',
              backgroundColor: '#fefae0',
              opacity: 0.7,
            }}
          >
            <section className="hero-section">
              <div className="card-grid">
                <div className="card" onClick={makeRoomHandler}>
                  <div className="card__background" style={{ backgroundImage: 'url(../../assets/makeFox.png)' }}></div>
                  <h3 className="card__heading">방만들기</h3>
                </div>

                <div className="card" onClick={handleOpen}>
                  <div className="card__background" style={{ backgroundImage: 'url(../../assets/joinFox.png)' }}></div>

                  <h3 className="card__heading">코드입력</h3>
                </div>
              </div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    width: '25%',
                    height: '20%',
                    position: 'absolute',
                    textAlign: 'center',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    boxShadow: 20,
                    fontFamily: 'omyu_pretty',
                  }}
                >
                  <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ marginY: 2 }}>
                    코드를 입력해주세요
                  </Typography>
                  <form onSubmit={entranceHandler}>
                    게임코드 :
                    <Input
                      color="success"
                      required
                      type="text"
                      value={code}
                      sx={{ marginX: 2 }}
                      onChange={codeHandler}
                    />
                    <Button color="success" type="submit">
                      입장
                    </Button>
                  </form>
                </Box>
              </Modal>
            </section>
          </Box>
        </main>
      </Box>
    </>
  );
}
