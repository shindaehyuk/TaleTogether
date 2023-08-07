import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import UpdateUserAxios from "../../../api/auth/Post/UpdateUserAxios";
import DeleteUserAxios from "../../../api/auth/delete/DeletUserAxios";
import UpdatePasswordAxios from "../../../api/auth/Post/UpdatePasswordAxios";
import { useSelector } from "react-redux";

function MyStatus() {
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const user = useSelector((state) => state.userSlice.userId);
  const props = { user, newPassword };

  const onChangeEmail = (event) => {
    // 이메일 입력창 입력
    setNewEmail(event.target.value);
  };

  const onChangeName = (event) => {
    // 닉네임 입력창 입력
    setNewName(event.target.value);
  };

  const onChangePassword = (event) => {
    // 비밀번호 입력창 입력
    setNewPassword(event.target.value);
  };

  const passwordEventHandler = (event) => {
    UpdatePasswordAxios(props);
    // form 제출시 새로고침 방지
    event.preventDefault();
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          height: "90%",
          marginTop: "2em",
          border: "1px solid black",
        }}
      >
        <h2>내 정보 수정</h2>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <h3>이메일</h3>
          <input type="text" onChange={onChangeEmail} size="50" />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <h3>닉네임</h3>
          <input type="text" onChange={onChangeName} size="50" />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            flexGrow: 1,
          }}
        >
          <>
            <Button onClick={handleOpen} variant="outlined" color="primary">
              <Typography variant="h4">비밀번호 변경</Typography>
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
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
                </form>
              </Box>
            </Modal>
          </>
          <Button onClick={() => UpdateUserAxios({ newEmail, newName })}>
            수정 완료
          </Button>
          <Button onClick={() => DeleteUserAxios({})}>회원 탈퇴</Button>
        </Box>
      </Box>
    </>
  );
}

export default MyStatus;
