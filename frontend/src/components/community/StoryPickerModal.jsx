// StoryPickerModal.js
import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Carousel } from "react-responsive-carousel"; // react-responsive-carousel 패키지를 설치하고 import 합니다.
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";
import getTaleAllAxios from "../../api/tale/getTaleAll";

function StoryPickerModal({ open, onClose, onSelectImage, userId }) {
  const [tales, setTales] = useState([]);

  useEffect(() => {
    const fetchTales = async () => {
      const allTales = await getTaleAllAxios(userId); // postTaleAllAxios 대신 getTaleAllAxios 사용
      if (allTales) {
        setTales(allTales);
      }
    };

    if (open) {
      fetchTales();
    }
  }, [open, userId]);

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
        <Carousel showThumbs={false}>
          {tales.map((tale, index) => (
            <div key={index} onClick={() => handleImageClick(tale.img)}>
              <img src={tale.img} alt={tale.title} />
              <p className="legend">{tale.title}</p>
            </div>
          ))}
        </Carousel>
        <Button onClick={onClose}>닫기</Button>
      </Box>
    </Modal>
  );
}

export default StoryPickerModal;
