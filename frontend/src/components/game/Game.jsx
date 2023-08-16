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
      <div className="cover">
        <div className="book">
          {/*방만들기 */}
          <label htmlFor="page-1" className="book__page book__page--1" onClick={pagehandler}>
            <div className=" image-wrapper shine">
              <div className="snip1573">
                <img src="../../assets/makeFox.png" alt="sample89" />
                <figcaption>
                  {page && (
                    <ThemeProvider theme={theme}>
                      <Button
                        variant="outlined"
                        onClick={makeRoomHandler}
                        color="white"
                        sx={{ fontSize: '20px', backgroundColor: 'black' }}
                      >
                        <Typography variant="h4">게임시작</Typography>
                      </Button>
                    </ThemeProvider>
                  )}
                </figcaption>
              </div>
            </div>
          </label>
          {/* 같이하기 */}
          <label htmlFor="page-2" className="book__page book__page--4 " onClick={pagehandler}>
            <div className="image-wrapper shine">
              <div className="snip1573">
                <img src="../../assets/joinFox.png" alt="" />
                <figcaption>
                  {!page && (
                    <ThemeProvider theme={theme}>
                      <Button
                        onClick={handleOpen}
                        variant="outlined"
                        color="white"
                        sx={{ fontSize: '20px', backgroundColor: 'black' }}
                      >
                        <Typography variant="h4">코드 입력하기</Typography>
                      </Button>
                    </ThemeProvider>
                  )}
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
                </figcaption>
              </div>
            </div>
          </label>

          <input type="radio" name="page" id="page-1" />
          <input type="radio" name="page" id="page-2" />

          {/* 앞뒤설명페이지 */}
          <label className="book__page book__page--2">
            <div className="book__page-front">
              <div className="page__content">
                <h1 className="page__content-book-title animate__animated animate__zoomIn">Tale Together</h1>
                <img
                  className="animate__animated animate__zoomIn animate__delay-1s"
                  style={{ width: '20%' }}
                  src="../../assets/Logo2-removebg-preview.png"
                  alt=""
                />
                <p className="page__content-credits">방을 만들어 다른사람과 함께 시작하세요!</p>
                <p className="page__content-credits">게임코드를 통해 원하는 사람과 함께하세요!</p>
                <div className="page__content-copyright">
                  <p>Tale Together</p>
                </div>
              </div>
            </div>
            <div className="book__page-back">
              <div className="page__content">
                <h1 className="page__content-book-title animate__animated animate__zoomIn">Tale Together</h1>
                <img
                  className="animate__animated animate__zoomIn animate__delay-1s"
                  style={{ width: '20%' }}
                  src="../../assets/Logo2-removebg-preview.png"
                  alt=""
                />
                <p className="page__content-credits">게임코드를 입력하여 원하는 방에 들어가보세요!</p>
                <p className="page__content-credits">나만의 동화를 만들어보세요!</p>
                <div className="page__content-copyright">
                  <p>Tale Together</p>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </>
  );
}
