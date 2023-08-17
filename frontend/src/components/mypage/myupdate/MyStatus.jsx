import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import UpdateUserAxios from '../../../api/auth/Post/UpdateUserAxios';
import DeleteUserAxios from '../../../api/auth/delete/DeletUserAxios';
import UpdatePasswordAxios from '../../../api/auth/Post/UpdatePasswordAxios';
import UserinfoAxios from '../../../api/auth/Get/UserinfoAxios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/userSlice';
import PasswordIcon from '@mui/icons-material/Password';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, Snackbar } from '@mui/material';
import TextField from '@mui/material/TextField';

function MyStatus() {
  const [newName, setNewName] = useState('');
  const [openName, setOpenName] = useState(false);
  const handleOpenName = () => setOpenName(true);
  const handleCloseName = () => {
    setOpenName(false);
    setNewName('');
  };

  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const handleOpenPassword = () => setOpenPassword(true);
  const handleClosePassword = () => {
    setOpenPassword(false);
    setNewPassword('');
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(0);

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => {
    setTimeout(() => {
      setOpenDelete(false);
    }, 0);
  };

  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const user = async () => {
    const res = await UserinfoAxios();
    setUserId(res.data.userId);
    setName(res.data.name);
  };
  useEffect(() => {
    user();
  }, []);

  const props = { newPassword, newName };

  const onChangeName = (event) => {
    // 닉네임 입력창 입력
    setNewName(event.target.value);
  };

  const onChangePassword = (event) => {
    // 비밀번호 입력창 입력
    const inputValue = event.target.value;
    setNewPassword(inputValue);

    // 유효성 검사
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^+=-])(?=.*[0-9]).{8,15}$/;
    const isValid = regex.test(inputValue);
    setPasswordValid(isValid);

    if (!isValid) {
      setPasswordError('*영문,숫자,특수기호를 포함한 8자리 이상, 15자리 이하');
    } else {
      setPasswordError('');
    }
  };

  const passwordEventHandler = (event) => {
    // form 제출시 새로고침 방지
    event.preventDefault();

    if (!passwordValid) {
      return;
    }
    UpdatePasswordAxios(props);
    handleClosePassword();
    setNewPassword('');
    setTimeout(() => {
      setOpen(1);
    }, 1000);
    navigate('/');
    dispatch(logout());
  };

  const nameEventHandler = (event) => {
    // form 제출시 새로고침 방지
    event.preventDefault();
    UpdateUserAxios(props);
    setTimeout(() => {
      setOpen(2);
    }, 1000);
    handleCloseName();
    setName(newName);
    setNewName('');
  };

  const deleteUserConfirmed = () => {
    DeleteUserAxios();
    setTimeout(() => {
      setOpen(3);
    }, 1000);
    navigate('/');
    dispatch(logout());
  };

  return (
    <>
      <Snackbar
        open={open === 1 || open === 2 || open === 3}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setOpen(0)}
      >
        <Alert severity={open === 1 || open === 2 || open === 3 ? 'success' : 'info'} sx={{ width: '100%' }}>
          {open === 1 && '비밀번호 변경이 완료되었습니다!'}
          {open === 2 && '닉네임 변경이 완료되었습니다!'}
          {open === 3 && '회원탈퇴가 완료되었습니다!'}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '90%',
          height: '90%',
          marginTop: '2em',
          fontFamily: 'omyu_pretty',
        }}
      >
        <h2>내 정보 수정</h2>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            fontFamily: 'omyu_pretty',
            justifyContent: 'center',
          }}
        >
          <h2 style={{ marginRight: '2em' }}>{name}</h2>
          <h3>{userId}</h3>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            flexGrow: 1,
          }}
        >
          <>
            <Button onClick={handleOpenPassword} color="primary">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <PasswordIcon />
                <Typography variant="h4">비밀번호 변경</Typography>
              </Box>
            </Button>
            <Modal
              open={openPassword}
              onClose={handleClosePassword}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '30%',
                  bgcolor: 'background.paper',
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <form onSubmit={passwordEventHandler}>
                  <TextField
                    type="password"
                    sx={{
                      width: '70%',
                      height: '10%',
                    }}
                    value={newPassword}
                    onChange={onChangePassword}
                    helperText={passwordError}
                    color="success"
                    error={!passwordValid && newPassword.length > 0}
                  />
                  <Button
                    type="submit"
                    sx={{
                      width: '15%',
                      height: '55px',
                      backgroundColor: '#d4a373',
                      color: 'black',
                    }}
                  >
                    변경
                  </Button>
                </form>
              </Box>
            </Modal>
          </>
          <>
            <Button onClick={handleOpenName} color="primary">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <AccountCircleIcon />
                <Typography variant="h4">닉네임 변경</Typography>
              </Box>
            </Button>
            <Modal
              open={openName}
              onClose={handleCloseName}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '30%',
                  bgcolor: 'background.paper',
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <form onSubmit={nameEventHandler}>
                  <TextField
                    sx={{
                      width: '70%',
                      height: '10%',
                    }}
                    value={newName}
                    onChange={onChangeName}
                  />
                  <Button
                    type="submit"
                    sx={{
                      width: '15%',
                      height: '55px',
                      backgroundColor: '#d4a373',
                      color: 'black',
                    }}
                  >
                    변경
                  </Button>
                </form>
              </Box>
            </Modal>
          </>
          <Button onClick={handleOpenDelete} color="error">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <DeleteIcon />
              <Typography variant="h4">회원탈퇴</Typography>
            </Box>
            <Modal
              open={openDelete}
              onClose={handleCloseDelete}
              aria-labelledby="confirm-modal-title"
              aria-describedby="confirm-modal-description"
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '30%',
                  bgcolor: 'background.paper',
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Typography variant="h6">탈퇴 하시겠습니까?</Typography>
                <Button onClick={deleteUserConfirmed} variant="contained" color="error">
                  예
                </Button>
                <Button onClick={handleCloseDelete} variant="outlined" color="error">
                  아니요
                </Button>
              </Box>
            </Modal>
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default MyStatus;
