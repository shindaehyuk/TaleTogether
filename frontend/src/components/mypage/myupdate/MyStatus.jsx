import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import UpdateUserAxios from "../../../api/auth/Post/UpdateUserAxios";
import DeleteUserAxios from "../../../api/auth/delete/DeletUserAxios";
import UpdatePasswordAxios from "../../../api/auth/Post/UpdatePasswordAxios";
import UserinfoAxios from "../../../api/auth/Get/UserinfoAxios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/userSlice";

function MyStatus() {
  const [newName, setNewName] = useState("");
  const [openName, setOpenName] = useState(false);
  const handleOpenName = () => setOpenName(true);
  const handleCloseName = () => {
    setOpenName(false);
    setNewName("");
  };

  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const handleOpenPassword = () => setOpenPassword(true);
  const handleClosePassword = () => {
    setOpenPassword(false);
    setNewPassword("");
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = async () => {
    const res = await UserinfoAxios();
  };
  useEffect(() => {
    user();
  });

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
      setPasswordError("*영문,숫자,특수기호를 포함한 8자리 이상, 15자리 이하");
    } else {
      setPasswordError("");
    }
  };

  const passwordEventHandler = (event) => {
    // form 제출시 새로고침 방지
    event.preventDefault();

    if (!passwordValid) {
      alert("*영문,숫자,특수기호를 포함한 8자리 이상, 15자리 이하");
      return;
    }
    UpdatePasswordAxios(props);
    handleClosePassword();
    setNewPassword("");
    navigate("/");
    dispatch(logout());
  };

  const nameEventHandler = (event) => {
    // form 제출시 새로고침 방지
    event.preventDefault();
    UpdateUserAxios(props);
    handleCloseName();
    setNewName("");
  };

  const deleteUserHandler = () => {
    DeleteUserAxios();
    navigate("/");
    dispatch(logout());
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          height: "90%",
          marginTop: "2em",
          fontFamily: "omyu_pretty",
        }}
      >
        <h2>내 정보 수정</h2>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            flexGrow: 1,
          }}
        >
          <>
            <Button
              onClick={handleOpenPassword}
              variant="outlined"
              color="primary"
            >
              <Typography variant="h4">비밀번호 변경</Typography>
            </Button>
            <Modal
              open={openPassword}
              onClose={handleClosePassword}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "50%",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <form onSubmit={passwordEventHandler}>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={onChangePassword}
                  />
                  <button type="submit">변경</button>
                  <span
                    id="modal-modal-description"
                    style={{ color: "red", marginLeft: "8px" }}
                  >
                    {passwordError}
                  </span>
                </form>
              </Box>
            </Modal>
          </>
          <>
            <Button onClick={handleOpenName} variant="outlined" color="primary">
              <Typography variant="h4">닉네임 변경</Typography>
            </Button>
            <Modal
              open={openName}
              onClose={handleCloseName}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "50%",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <form onSubmit={nameEventHandler}>
                  <input type="text" value={newName} onChange={onChangeName} />
                  <button type="submit">변경</button>
                </form>
              </Box>
            </Modal>
          </>
          <Button onClick={deleteUserHandler}>회원 탈퇴</Button>
        </Box>
      </Box>
    </>
  );
}

export default MyStatus;
