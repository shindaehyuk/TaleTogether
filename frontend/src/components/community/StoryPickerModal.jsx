// StoryPickerModal.js
import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Carousel } from 'react-responsive-carousel'; // react-responsive-carousel 패키지를 설치하고 import 합니다.
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import img1 from './src/1.png'
import img2 from './src/2.png'

function StoryPickerModal({ open, onClose, onSelectImage }) {
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

  const handleImageClick = (src) => {
    onSelectImage(src);
    onClose();
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
        <Carousel showThumbs={false}>
          <div onClick={() => handleImageClick(img1)}>
            <img src={img1} alt="image1" />
          </div>
          <div onClick={() => handleImageClick(img2)}>
            <img src={img2} alt="image2" />
          </div>
          <div onClick={() => handleImageClick(img2)}>
            <img src={img2} alt="image3" />
          </div>
          {/* 이곳에 추가 이미지를 넣으려면 같은 형식으로 추가해 주세요. */}
        </Carousel>
        <Button onClick={onClose}>닫기</Button>
      </Box>
    </Modal>
  );
}

export default StoryPickerModal;

