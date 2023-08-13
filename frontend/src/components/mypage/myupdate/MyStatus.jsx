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
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [openPassword, setOpenPassword] = useState(false);
  const [openName, setOpenName] = useState(false);
  const handleOpenPassword = () => setOpenPassword(true);
  const handleClosePassword = () => setOpenPassword(false);
  const handleOpenName = () => setOpenName(true);
  const handleCloseName = () => setOpenName(false);
  const [userId, setUserId] = useState("");

  const user = async () => {
    const res = await UserinfoAxios();
    setUserId(res.data.userId);
  };
  useEffect(() => {
    user();
  });

  const props = { userId, newPassword, newName };

  const onChangeName = (event) => {
    // 닉네임 입력창 입력
    setNewName(event.target.value);
  };

  const onChangePassword = (event) => {
    // 비밀번호 입력창 입력
    setNewPassword(event.target.value);
  };

  const passwordEventHandler = (event) => {
    // form 제출시 새로고침 방지
    event.preventDefault();
    UpdatePasswordAxios(props);
    handleClosePassword();
    setNewPassword("");
  };
  const nameEventHandler = (event) => {
    // form 제출시 새로고침 방지
    event.preventDefault();
    UpdateUserAxios(props);
    handleCloseName();
    setNewName("");
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
          border: "1px solid black",
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
          <Button onClick={() => DeleteUserAxios(props)}>회원 탈퇴</Button>
        </Box>
      </Box>
    </>
  );
}

export default MyStatus;
