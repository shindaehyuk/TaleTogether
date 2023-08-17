import { OpenVidu } from 'openvidu-browser';
import './Openvidu.css';

import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import UserVideoComponent from './UserVideoComponent';
import { useLocation } from 'react-router';
import { Box, Button, Grid, ImageList, ImageListItem, TextField } from '@mui/material';
import { set, useForm } from 'react-hook-form';
import createChatAxios from '../../api/chat-gpt/createChatAxios';
import getPageAxios from '../../api/page/getPageAxios';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import SendIcon from '@mui/icons-material/Send';
import { axiosInstance } from '../route/axiosInstance';
import getTaleAxios from '../../api/tale/getTaleAxios';
import Modal from '@mui/material/Modal';
import Book from '../mypage/mystory/Book';
import SummarizeBook from '../mypage/mystory/SummarizeBook';
import finishChatAxios from '../../api/chat-gpt/finishChatAxios';
import saveTitleAxios from '../../api/chat-gpt/saveTitleAxios';
import MovingFox from '../../page/MovingFox';

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : '//i9c110.p.ssafy.io/';
// const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8083/';

export default function Openvidu() {
  //sessionId
  const { state } = useLocation();

  const [mySessionId, setMySessionId] = useState(state.code);
  const [myUserName, setMyUserName] = useState(sessionStorage.getItem('token'));
  const [taleid, setTaleid] = useState(state.taleId);
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
  const [hasJoinedSession, setHasJoinedSession] = useState(false);
  const OV = useRef(new OpenVidu({ logLevel: 'error' }));

  const [showForm, setShowForm] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [script, setScript] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [GptInput, setGptInput] = useState('');
  const [owner, setOwner] = useState(state.owner);
  const [loading, setLoading] = useState('false');
  const [image, setImage] = useState('../assets/Logo1-removebg-preview.png');
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const chatScrollRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [openimage, setOpenimage] = useState(false);
  const [pageList, setPageList] = useState([]);
  const [showLastForm, setShowLastForm] = useState(false);

  const [showbook, setShowBook] = useState(false);
  const [finish, setFinish] = useState(true);
  const [choiceImage, setChoiceImage] = useState('');
  const [choicetitle, setChoiceTitle] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formData, setFormData] = useState({
    player1: '',
    player1Character: '',
    player2: '',
    player2Character: '',
    backGround: '',
    turn: '',
    taleId: state.taleId,
  });

  const fields = [
    {
      label: '등장인물 1',
      name: 'player1',
    },
    {
      label: '등장인물 1 성격 ',
      name: 'player1Character',
    },
    {
      label: '등장인물 2',
      name: 'player2',
    },
    {
      label: '등장인물 2 성격 ',
      name: 'player2Character',
    },
    {
      label: '배경',
      name: 'backGround',
    },
    {
      label: '턴수',
      name: 'turn',
    },
  ];

  const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const boxStyle = {
    position: 'absolute',
    display: 'flex',
    width: '80%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    overflow: 'auto',
    backgroundImage: `url("../../assets/BookTemplate.jpg")`,
    backgroundSize: '101.5% 100%',
  };

  const getTaleBook = async () => {
    const res = await getTaleAxios(taleid);
    setPageList(res.data.pageList);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleImageClose = () => {
    setOpenimage(false);
  };

  const handleImageOpen = () => {
    setOpenimage(true);
  };

  // 페이지 뒤로가기 막기
  window.addEventListener('popstate', function (event) {
    // 페이지 새로고침
    window.location.href = '/game'; // 다른 URL로 이동

    // 뒤로가기와 앞으로 가기 막기
    window.history.pushState(null, null, window.location.href);
  });

  const handleMainVideoStream = useCallback(
    (stream) => {
      if (mainStreamManager !== stream) {
        setMainStreamManager(stream);
      }
    },
    [mainStreamManager]
  );

  /// 방 처음 들어올때 세션만드는거
  useEffect(() => {
    if (!hasJoinedSession) {
      makeSession();
    }
    setHasJoinedSession(true);
  });

  // 방 처음 만들 때 함수
  const makeSession = () => {
    const mySession = OV.current.initSession();
    mySession.on('streamCreated', (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((subscribers) => [...subscribers, subscriber]);

      // 폼데이터입력시 데이터보내기
      event.stream.session.on('signal:custom', (event) => {
        const receivedData = JSON.parse(event.data);

        //폼데이터 받는 로직
        if (receivedData.field && receivedData.value) {
          const updatedField = receivedData.field;
          const updatedValue = receivedData.value;
          setFormData((prevData) => ({
            ...prevData,
            [updatedField]: updatedValue,
          }));
        }
      });
      // 게임시작 신호 보내기
      event.stream.session.on('signal:start', (event) => {
        const receivedData = JSON.parse(event.data);
        setGameStarted(receivedData);
        setScript('Tale Together를 시작하기 전 주인공들의 이름과 성격, 배경, 턴수를 입력해주세요');
      });
      // 폼보여주는 신호 보내기
      event.stream.session.on('signal:ShowForm', (event) => {
        const receivedData = JSON.parse(event.data);

        setShowInput(!receivedData);

        setTimeout(() => {
          setShowForm(receivedData);
        }, 5000); // 로그인 후 메인페이지로 이동
      });
      // 스크립트 변경 신호 보내기
      event.stream.session.on('signal:script', (event) => {
        const receivedData = JSON.parse(event.data);
        setScript(receivedData.script);
        setImage(receivedData.image);
        setGptInput('');
        setLoading('false');
        getTaleBook();
        setShowBook(true);
      });
      // gpt input창 변경 신호 보내기
      event.stream.session.on('signal:GptInput', (event) => {
        const receivedData = JSON.parse(event.data);
        setGptInput(receivedData);
      });
      // message 보내기
      event.stream.session.on('signal:message', (event) => {
        const receivedData = JSON.parse(event.data);
        setMessageList((prevMessageList) => [...prevMessageList, receivedData]);
      });

      event.stream.session.on('signal:loading', (event) => {
        const receivedData = JSON.parse(event.data);
        setLoading(receivedData);
        setShowInput(true);
      });

      event.stream.session.on('signal:finish', (event) => {
        const receivedData = JSON.parse(event.data);
        setPageList(receivedData);
        setLoading('false');
        setShowInput(false);
        setImage('../assets/Logo1-removebg-preview.png');
        setScript('마지막으로 동화의 제목과 메인사진을 골라주세요!');
        setShowLastForm(true);
        setFinish(false);
      });

      event.stream.session.on('signal:finishgame', () => {
        window.alert('게임을 종료합니다.');
        window.location.href = '/game'; // 다른 URL로 이동
      });
    });

    mySession.on('streamDestroyed', (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on('exception', (exception) => {
      console.warn(exception);
    });

    setSession(mySession);
  };

  useEffect(() => {
    if (session) {
      // Get a token from the OpenVidu deployment
      getToken().then(async (token) => {
        try {
          await session.connect(token, { clientData: myUserName });

          let publisher = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
            resolution: '325x155',
            frameRate: 30,
            insertMode: 'APPEND',
            mirror: true,
          });

          session.publish(publisher);

          const devices = await OV.current.getDevices();
          const videoDevices = devices.filter((device) => device.kind === 'videoinput');
          const currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
          const currentVideoDevice = videoDevices.find((device) => device.deviceId === currentVideoDeviceId);

          setMainStreamManager(publisher);
          setPublisher(publisher);
          setCurrentVideoDevice(currentVideoDevice);
        } catch (error) {
          console.log('There was an error connecting to the session:', error.code, error.message);
        }
      });
    }
  }, [session, myUserName]);

  // 채팅창 자동스크롤위치
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messageList]);

  const leaveSession = useCallback(() => {
    // Leave the session
    if (session) {
      session.disconnect();
    }
    window.location.href = '/game'; // 다른 URL로 이동
  }, [session]);

  const deleteSubscriber = useCallback((streamManager) => {
    setSubscribers((prevSubscribers) => {
      const index = prevSubscribers.indexOf(streamManager);
      if (index > -1) {
        const newSubscribers = [...prevSubscribers];
        newSubscribers.splice(index, 1);
        return newSubscribers;
      } else {
        return prevSubscribers;
      }
    });
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      leaveSession();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [leaveSession]);

  const getToken = useCallback(async () => {
    return createSession(mySessionId).then((sessionId) => createToken(sessionId));
  }, [mySessionId]);

  const createSession = async (sessionId) => {
    const response = await axiosInstance.post('get-sessions', { customSessionId: sessionId });
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const response = await axiosInstance.post('sessions/' + sessionId + '/connections');
    return response.data; // The token
  };

  const sendFormDataToSubscribers = (fieldName, fieldValue) => {
    if (session) {
      const dataToSend = {
        field: fieldName,
        value: fieldValue,
      };

      session
        .signal({
          type: 'custom',
          data: JSON.stringify(dataToSend),
        })
        .then(() => {
          console.log('Data sent successfully:', fieldName, fieldValue);
        })
        .catch((error) => {
          console.error('Error sending data:', error);
        });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const newTypingTimeout = setTimeout(() => {
      sendFormDataToSubscribers(name, value);
    }, 500);

    setTypingTimeout(newTypingTimeout);
  };

  // 게임설정 완료 핸들러
  const settingCompleteHandler = async () => {
    await loadingHandler();
    const res = await createChatAxios(formData, '');
    const pageId = await getPageAxios(res.data.pageId);
    setScript(pageId.data.content);
    setImage(pageId.data.content);
    sendScriptToSubscribers(pageId.data.content, pageId.data.image);
    setShowForm(false);
    sendShowFormToSubscribers(false);
    setShowInput(true);
    setLoading('false');
    setShowBook(true);
  };

  // 처음 게임시작버튼 핸들러
  const startgameHandler = () => {
    setScript('Tale Together를 시작하기 전 주인공들의 이름과 성격, 배경, 턴수를 입력해주세요');
    // setShowForm(true);
    sendShowFormToSubscribers(true);
    // setGameStarted(true);
    sendDataToSubscribers(true);
    getTaleBook();
  };

  //보내고 싶은 데이터 보낼때 사용
  const sendDataToSubscribers = (data) => {
    if (session) {
      session
        .signal({
          type: 'start',
          data: JSON.stringify(data),
        })
        .then(() => {
          console.log('Data sent successfully:', data);
        })
        .catch((error) => {
          console.error('Error sending data:', error);
        });
    }
  };
  //쇼폼신호 보낼때 사용
  const sendShowFormToSubscribers = (data) => {
    if (session) {
      session
        .signal({
          type: 'ShowForm',
          data: JSON.stringify(data),
        })
        .then(() => {
          console.log('Data sent successfully:', data);
        })
        .catch((error) => {
          console.error('Error sending data:', error);
        });
    }
  };
  // 스크립트 메세지 보낼때 사용
  const sendScriptToSubscribers = (script, image) => {
    if (session) {
      const data = {
        script: script,
        image: image,
      };

      session
        .signal({
          type: 'script',
          data: JSON.stringify(data),
        })
        .then(() => {
          console.log('Data sent successfully:', data);
        })
        .catch((error) => {
          console.error('Error sending data:', error);
        });
    }
  };
  // gpt입력창 메세지 보낼때 사용
  const sendGptInputToSubscribers = (data) => {
    if (session) {
      session
        .signal({
          type: 'GptInput',
          data: JSON.stringify(data),
        })
        .then(() => {
          console.log('Data sent successfully:', data);
        })
        .catch((error) => {
          console.error('Error sending data:', error);
        });
    }
  };

  const GptInputHandler = (e) => {
    console.log(e.target);
    setGptInput(e.target.value);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const newTypingTimeout = setTimeout(() => {
      sendGptInputToSubscribers(e.target.value);
    }, 500);

    setTypingTimeout(newTypingTimeout);
  };

  // 스크립트 제작
  const makeScriptHandler = async () => {
    const res = await createChatAxios(formData, GptInput);
    const pageId = await getPageAxios(res.data.pageId);
    setScript(pageId.data.content);
    setImage(pageId.data.content);
    sendScriptToSubscribers(pageId.data.content, pageId.data.image);
    setGptInput('');
    setLoading(true);
    getTaleBook();
  };

  // 메세지 변경
  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
  };
  // 메세지 보내기
  const sendMessageToSubscribers = (e) => {
    e.preventDefault();
    const mydata = {
      message: message,
      nickname: myUserName,
    };
    setMessage('');
    if (session) {
      session
        .signal({
          type: 'message',
          data: JSON.stringify(mydata),
        })
        .then(() => {
          console.log('Data sent successfully:', mydata);
        })
        .catch((error) => {
          console.error('Error sending data:', error);
        });
    }
  };

  const [output, setOutput] = useState('');

  useEffect(() => {
    let strCopy = [...script];
    let outputString = '';

    const animate = () => {
      if (strCopy.length > 0) {
        outputString += strCopy.shift();
        setOutput(outputString);
        setTimeout(animate, 90);
      }
    };

    animate();
  }, [script]);

  //로딩신호 보내기
  const sendLoadingToSubscribers = (data) => {
    if (session) {
      session
        .signal({
          type: 'loading',
          data: JSON.stringify(data),
        })
        .then(() => {
          console.log('Data sent successfully:', data);
        })
        .catch((error) => {
          console.error('Error sending data:', error);
        });
    }
  };
  // 스크립트 로딩핸들러
  const loadingHandler = async () => {
    setLoading('true');
    sendLoadingToSubscribers('true');
  };

  const sendFinishToSubscribers = (data) => {
    if (session) {
      session
        .signal({
          type: 'finish',
          data: JSON.stringify(data),
        })
        .then(() => {
          console.log('Data sent successfully:', data);
        })
        .catch((error) => {
          console.error('Error sending data:', error);
        });
    }
  };

  const finishHandler = async () => {
    setFinish(false);
    await loadingHandler();
    const res = await finishChatAxios(state.taleId);
    sendFinishToSubscribers(res.data);
    setPageList(res.data);
    setShowInput(false);
    setImage('../assets/Logo1-removebg-preview.png');
    setLoading('false');
    setShowLastForm(true);
    setScript('마지막으로 동화의 제목과 메인사진을 골라주세요!');
  };

  const saveHandler = async (e) => {
    e.preventDefault();
    const data = {
      taleId: state.taleId,
      title: choicetitle,
      titleImage: choiceImage,
    };
    await saveTitleAxios(data);
    sendfinishGameToSubscribers();
    window.location.href = '/game'; // 다른 URL로 이동
  };

  const sendfinishGameToSubscribers = () => {
    if (session) {
      session
        .signal({
          type: 'finishgame',
        })
        .then(() => {
          console.log('Data sent successfully');
        })
        .catch((error) => {
          console.error('Error sending data');
        });
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '90%',
          height: '90%',
          bgcolor: '#CCD5AE',
          borderRadius: '40px',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: 10,
        }}
      >
        <Box
          sx={{
            width: '30%',
            height: '95%',
            borderRadius: '40px',
            marginRight: '5%',
            backgroundColor: '#faedcd',
            boxShadow: 10,
          }}
        >
          {/* 상태창  */}
          <Box sx={{ flexGrow: 1 }}>
            <AppBar
              position="static"
              sx={{ borderTopRightRadius: '30px', borderTopLeftRadius: '30px', backgroundColor: '#d4a373' }}
            >
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  게임방 코드: {mySessionId}
                </Typography>
                {state.owner && !gameStarted && (
                  <Button color="inherit" onClick={startgameHandler}>
                    게임시작
                  </Button>
                )}
                <Button color="inherit" onClick={leaveSession}>
                  종료하기
                </Button>
              </Toolbar>
            </AppBar>
          </Box>
          {/* 나의 카메라 */}
          <Box
            sx={{
              width: '100%',
              height: '30%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {mainStreamManager !== undefined ? <UserVideoComponent streamManager={mainStreamManager} /> : null}
          </Box>
          {/* 상대방 카메라 */}
          <Box sx={{ width: '100%', height: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {subscribers.map((sub, i) => (
              <div key={sub.id} onClick={() => handleMainVideoStream(sub)}>
                <span>{sub.id}</span>
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
          </Box>
          {/* 채팅창 */}
          <Box
            sx={{
              width: '100%',
              height: '30%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                width: '377px',
                height: '90%',
                backgroundColor: '#d4a373',
                fontFamily: 'omyu_pretty',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '20px',
              }}
            >
              <div ref={chatScrollRef} className="chat-box">
                <div className="container">
                  {messageList.map((data, index) => (
                    <div key={index}>
                      {data.nickname === myUserName ? (
                        <div className="message-mybody">{data.message}</div>
                      ) : (
                        <div className="message-yourbody">{data.message}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <Box
                sx={{
                  display: 'flex',
                  height: '20%',
                  width: '100%',
                  marginBottom: '10px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    backgroundColor: 'white',

                    width: '90%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '20px',
                  }}
                >
                  <form onSubmit={sendMessageToSubscribers} style={{ width: '100%' }}>
                    <Input
                      disableUnderline
                      sx={{
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        width: '70%',
                      }}
                      placeholder="메세지를 입력하세요"
                      value={message}
                      onChange={messageChangeHandler}
                    />
                    <Button variant="text" color="inherit" type="submit">
                      <SendIcon></SendIcon>
                    </Button>
                  </form>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: '60%',
            height: '95%',
            borderRadius: '40px',
            backgroundColor: '#faedcd',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            boxShadow: 10,
          }}
        >
          {/* 이미지 출력 박스 */}
          {showInput && loading === 'true' && <MovingFox />}
          {loading === 'false' && (
            <Box
              sx={{
                width: '95%',
                height: '80%',
                margin: 1,
              }}
            >
              <div className="scene">
                <div className="book-wrap">
                  <div className="left-side">
                    <div className="book-cover-left"></div>
                    <div className="layer1">
                      <div className="page-left"></div>
                    </div>
                    <div className="layer2">
                      <div className="page-left"></div>
                    </div>
                    <div className="layer3">
                      <div className="page-left"></div>
                    </div>
                    <div className="layer4">
                      <div className="page-left"></div>
                    </div>
                    <div className="layer-text">
                      <div className="page-left-2">
                        <div className="corner"></div>
                        <div className="corner2"></div>
                        <div className="corner-fold"></div>
                        <div className="page-text w-richtext">
                          <img className="img" src={image} alt=""></img>
                          {showInput && (
                            <>
                              <form
                                onSubmit={() => {
                                  loadingHandler();
                                  makeScriptHandler();
                                }}
                                style={{
                                  fontFamily: 'omyu_pretty',
                                  fontSize: '18px',
                                  marginTop: 10,
                                  marginBottom: 10,
                                }}
                              >
                                이곳에 답변을 입력해주세요!
                                <Input
                                  color="success"
                                  required
                                  type="text"
                                  value={GptInput}
                                  sx={{ marginX: 2 }}
                                  onChange={GptInputHandler}
                                />
                                <Button color="success" type="submit">
                                  제출하기
                                </Button>
                              </form>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="center"></div>
                  <div className="right-side">
                    <div className="book-cover-right"></div>
                    <div className="layer1">
                      <div className="page-right"></div>
                    </div>
                    <div className="layer2 right">
                      <div className="page-right"></div>
                    </div>
                    <div className="layer3 right">
                      <div className="page-right"></div>
                    </div>
                    <div className="layer4 right">
                      <div className="page-right"></div>
                    </div>
                    <div className="layer-text right">
                      <div className="page-right-2">
                        <div className="page-text w-richtext">
                          <p className="script">{output}</p>
                          {/* 게임 시작하기 전 입력 폼 */}
                          {showForm && state.owner && (
                            <Box
                              component="form"
                              noValidate
                              onSubmit={handleSubmit(settingCompleteHandler)}
                              sx={{ marginTop: '10%' }}
                            >
                              <Grid container spacing={2}>
                                {fields.map((field) => (
                                  <Grid item xs={6}>
                                    <TextField
                                      key={field.name}
                                      className="animate__animated animate__fadeIn animate__delay-0.3s"
                                      required
                                      fullWidth
                                      color="success"
                                      label={field.label}
                                      {...register(field.name, { required: true })}
                                      error={!!errors[field.name]}
                                      sx={{ backgroundColor: '#faedcd', borderRadius: '5px' }}
                                      onChange={handleChange}
                                      value={formData[field.name]}
                                      name={field.name}
                                    />
                                  </Grid>
                                ))}
                              </Grid>

                              <Button
                                className="animate__animated animate__fadeIn animate__delay-1.2s"
                                type="submit"
                                fullWidth
                                color="inherit"
                                variant="contained"
                                sx={{ mt: 4, mb: 4, backgroundColor: '#faedcd', color: 'black' }}
                              >
                                게임시작
                              </Button>
                            </Box>
                          )}
                          {/* 방장 아닌 사람에게 뜨는 입력 폼 */}
                          {showForm && !state.owner && (
                            <Box component="form" noValidate sx={{ marginTop: '10%' }}>
                              <Grid container spacing={2}>
                                {fields.map((field) => (
                                  <Grid item xs={6}>
                                    <TextField
                                      key={field.name}
                                      className="animate__animated animate__fadeIn animate__delay-0.3s"
                                      required
                                      fullWidth
                                      disabled
                                      color="success"
                                      label={field.label}
                                      {...register(field.name, { required: true })}
                                      error={!!errors[field.name]}
                                      sx={{ backgroundColor: '#faedcd', borderRadius: '5px' }}
                                      onChange={handleChange}
                                      value={formData[field.name]}
                                      name={field.name}
                                    />
                                  </Grid>
                                ))}
                              </Grid>
                            </Box>
                          )}

                          {/* 마지막폼 */}
                          {showLastForm && state.owner && (
                            <Box sx={{ marginTop: 4 }}>
                              <form onSubmit={saveHandler}>
                                <Grid container spacing={2}>
                                  <Grid item xs={12}>
                                    <TextField
                                      className="animate__animated animate__fadeIn animate__delay-0.3s"
                                      required
                                      fullWidth
                                      label="타이틀"
                                      value={choicetitle}
                                      onChange={(e) => {
                                        setChoiceTitle(e.target.value);
                                      }}
                                      autoFocus
                                      color="success"
                                      sx={{ backgroundColor: '#faedcd', borderRadius: '5px' }}
                                    />
                                  </Grid>
                                  <Grid item xs={12}>
                                    <img
                                      style={{ width: '100%', height: '100%' }}
                                      src={choiceImage}
                                      alt="이미지를 선택해주세요"
                                    ></img>
                                  </Grid>

                                  <Grid item xs={6}>
                                    <Button
                                      className="animate__animated animate__fadeIn animate__delay-1.2s"
                                      fullWidth
                                      color="inherit"
                                      variant="contained"
                                      sx={{ mt: 4, mb: 4, backgroundColor: '#faedcd', color: 'black' }}
                                      onClick={handleImageOpen}
                                    >
                                      이미지 선택하기
                                    </Button>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Button
                                      className="animate__animated animate__fadeIn animate__delay-1.2s"
                                      type="submit"
                                      fullWidth
                                      color="inherit"
                                      variant="contained"
                                      sx={{ mt: 4, mb: 4, backgroundColor: '#faedcd', color: 'black' }}
                                    >
                                      저장하고 종료하기
                                    </Button>
                                  </Grid>
                                </Grid>
                              </form>
                            </Box>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          )}

          {/* 기타 설정박스  */}
          <Box sx={{ width: '50%' }}>
            <AppBar position="static" sx={{ borderRadius: '30px', backgroundColor: '#d4a373' }}>
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Tale Together
                </Typography>
                {showbook && (
                  <Button color="inherit" onClick={handleOpen}>
                    동화보기
                  </Button>
                )}
                {showInput && owner && finish && loading === 'false' && (
                  <Button color="inherit" onClick={finishHandler}>
                    동화완결
                  </Button>
                )}

                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-title"
                  aria-describedby="modal-description"
                  style={modalStyle}
                >
                  {finish ? (
                    <Box sx={boxStyle}>
                      <Book pageList={pageList} />
                    </Box>
                  ) : (
                    <Box sx={boxStyle}>
                      <SummarizeBook pageList={pageList} />
                    </Box>
                  )}
                </Modal>

                <Modal
                  open={openimage}
                  onClose={handleImageClose}
                  aria-labelledby="modal-title"
                  aria-describedby="modal-description"
                  style={modalStyle}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '50%',
                      height: '80%',
                      bgcolor: 'background.paper',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 24,
                      p: 4,
                    }}
                  >
                    <ImageList
                      sx={{
                        width: '90%',
                        height: '90%',
                        overflowY: 'scroll',
                        '&::-webkit-scrollbar': {
                          display: 'none',
                        },
                      }}
                      cols={3}
                    >
                      {pageList.map((item) => (
                        <ImageListItem key={item.img} sx={{ widht: '30%', height: 'auto' }}>
                          <img
                            src={`${item.image}`}
                            alt=""
                            loading="lazy"
                            onClick={() => {
                              setChoiceImage(item.image);
                              handleImageClose();
                            }}
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Box>
                </Modal>
              </Toolbar>
            </AppBar>
          </Box>
        </Box>
      </Box>
    </>
  );
}
