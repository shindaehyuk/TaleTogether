import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

function MyStatus() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (event) => {
    // 이메일 입력창 입력
    setEmail(event.target.value);
  };

  const onChangeNickname = (event) => {
    // 닉네임 입력창 입력
    setNickname(event.target.value);
  };

  const onChangePassword = (event) => {
    // 비밀번호 입력창 입력
    setPassword(event.target.value);
  };

  const eventHandler = (event) => {
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
          <input type="text" onChange={onChangeNickname} size="50" />
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
                <form onSubmit={eventHandler}>
                  <input
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                  />
                  <button type="submit">변경</button>
                </form>
              </Box>
            </Modal>
          </>
          <button>수정 완료</button>
          <button>회원 탈퇴</button>
        </Box>
      </Box>
    </>
  );
}

export default MyStatus;
