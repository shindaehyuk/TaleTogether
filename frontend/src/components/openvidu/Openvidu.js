import { OpenVidu } from 'openvidu-browser';
import './Openvidu.css';

import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import UserVideoComponent from './UserVideoComponent';
import { useLocation } from 'react-router';
import { Box, Button, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import createChatAxios from '../../api/chat-gpt/createChatAxios';
import getPageAxios from '../../api/page/getPageAxios';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import SendIcon from '@mui/icons-material/Send';

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : '//i9c110.p.ssafy.io';

export default function Openvidu() {
  //sessionId
  const { state } = useLocation();

  const [mySessionId, setMySessionId] = useState(state.code);
  const [myUserName, setMyUserName] = useState(sessionStorage.getItem('token'));
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
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const chatScrollRef = useRef(null);

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

  // 페이지 뒤로가기 막기
  window.addEventListener('popstate', function (event) {
    // 페이지 새로고침
    window.location.href = '/intro'; // 다른 URL로 이동

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
  useEffect(() => {
    console.log(subscribers);
  }, [subscribers]);

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
        console.log('Received data from sender:', receivedData);

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
        setShowForm(receivedData);
        setShowInput(!receivedData);
      });
      // 스크립트 변경 신호 보내기
      event.stream.session.on('signal:script', (event) => {
        const receivedData = JSON.parse(event.data);
        setScript(receivedData.script);
        setImage(`https://i9c110.p.ssafy.io:8083/${receivedData.image}`);
        setGptInput('');
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
            resolution: '355x185',
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
    window.location.href = '/intro'; // 다른 URL로 이동
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
    const response = await axios.post(
      APPLICATION_SERVER_URL + 'api/get-sessions',
      { customSessionId: sessionId },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections',
      {},
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
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
    const res = await createChatAxios(formData, '');
    const pageId = await getPageAxios(res.data.pageId);
    setScript(pageId.data.content);
    setImage(`https://i9c110.p.ssafy.io:8083/${pageId.data.content}`);
    sendScriptToSubscribers(pageId.data.content, pageId.data.image);
    setShowForm(false);
    sendShowFormToSubscribers(false);
    setShowInput(true);
  };

  // 처음 게임시작버튼 핸들러
  const startgameHandler = () => {
    setScript('Tale Together를 시작하기 전 주인공들의 이름과 성격, 배경, 턴수를 입력해주세요');
    // setShowForm(true);
    sendShowFormToSubscribers(true);
    // setGameStarted(true);
    sendDataToSubscribers(true);
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
    setImage(`https://i9c110.p.ssafy.io:8083/${pageId.data.content}`);
    sendScriptToSubscribers(pageId.data.content, pageId.data.image);
    setGptInput('');
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
                {loading}
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
                <div class="container">
                  {messageList.map((data, index) => (
                    <div key={index}>
                      {data.nickname === myUserName ? (
                        <div class="message-mybody">{data.message}</div>
                      ) : (
                        <div class="message-yourbody">{data.message}</div>
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
          <Box
            sx={{
              width: '95%',
              height: '80%',
              margin: 1,
            }}
          >
            <div class="scene">
              <div class="book-wrap">
                <div class="left-side">
                  <div class="book-cover-left"></div>
                  <div class="layer1">
                    <div class="page-left"></div>
                  </div>
                  <div class="layer2">
                    <div class="page-left"></div>
                  </div>
                  <div class="layer3">
                    <div class="page-left"></div>
                  </div>
                  <div class="layer4">
                    <div class="page-left"></div>
                  </div>
                  <div class="layer-text">
                    <div class="page-left-2">
                      <div class="corner"></div>
                      <div class="corner2"></div>
                      <div class="corner-fold"></div>
                      <div class="page-text w-richtext">
                        <img src={image} alt=""></img>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="center"></div>
                <div class="right-side">
                  <div class="book-cover-right"></div>
                  <div class="layer1">
                    <div class="page-right"></div>
                  </div>
                  <div class="layer2 right">
                    <div class="page-right"></div>
                  </div>
                  <div class="layer3 right">
                    <div class="page-right"></div>
                  </div>
                  <div class="layer4 right">
                    <div class="page-right"></div>
                  </div>
                  <div class="layer-text right">
                    <div class="page-right-2">
                      <div class="page-text w-richtext">
                        <p>{output}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Box>

          {/* 스크립트 출력 박스  */}
          <Box sx={{ width: '90%', height: '20%', border: 1 }}>
            {/* Gpt입력창 */}
            {showInput &&
              (owner ? (
                <>
                  <input type="text" value={GptInput} onChange={GptInputHandler} />
                  <Button variant="text" color="inherit" onClick={makeScriptHandler}>
                    제출하기
                  </Button>
                </>
              ) : (
                <>
                  <input type="text" value={GptInput} disabled />
                </>
              ))}

            {/* 게임 시작하기 전 입력 폼 */}
            {showForm && state.owner && (
              <Box component="form" noValidate onSubmit={handleSubmit(settingCompleteHandler)} sx={{}}>
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
              <Box component="form" noValidate sx={{}}>
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
          </Box>
        </Box>
      </Box>
    </>
  );
}
