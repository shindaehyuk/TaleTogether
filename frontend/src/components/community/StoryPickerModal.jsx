// StoryPickerModal.js
import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

function StoryPickerModal({ open, onClose }) {
  const modalBody = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalBody}>
        <h2 id="modal-title">동화 선택</h2>
        <p id="modal-description">동화를 선택해주세요.</p>
        {/* 여기에 동화 선택 기능을 추가하세요. */}
        <Button onClick={onClose}>닫기</Button>
      </Box>
    </Modal>
  );
}

export default StoryPickerModal;
