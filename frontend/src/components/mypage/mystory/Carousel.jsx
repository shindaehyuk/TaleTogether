import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";
import AreaCard from "./Card";
import React, { useState, useEffect } from "react";
import getTaleAllAxios from "../../../api/tale/getTaleAll";
import UserinfoAxios from "../../../api/auth/Get/UserinfoAxios";
import deleteTaleAxios from "../../../api/tale/deleteTaleAxios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import notale from "../../community/src/notale.png";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

// 이전 화살표 디자인
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        right: "10px",
      }}
      onClick={onClick}
    />
  );
}

// 다음 화살표 디자인
function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        left: "0px",
      }}
      onClick={onClick}
    />
  );
}

const Carousel = () => {
  const [myStories, setMyStories] = useState([]);
  const cardWrapperStyle = {
    position: "relative",
  };

  const deleteButtonStyle = {
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 1,
  };

  const user = async () => {
    const res = await UserinfoAxios();
  };
  useEffect(() => {
    user();
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getTaleAllAxios();
        setMyStories(response);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  // console.log(myStories);

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => {
    setTimeout(() => {
      setOpenDelete(false);
    }, 0);
  };

  const deleteTaleHandler = async (myStory) => {
    await deleteTaleAxios(myStory);
    const newStories = myStories.filter((story) => story !== myStory);
    setMyStories(newStories);
  };

  const infiniteEnabled = myStories.length > 6;

  const settings = {
    dots: true,
    infinite: infiniteEnabled,
    speed: 500,
    slidesToShow: 3, // 한 번에 보여질 슬라이드 수를 3으로 변경
    slidesToScroll: 1,
    rows: 2, // 추가된 rows 옵션. 이 값을 2로 설정하여 세로 2개 카로셀이 만들어짐
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerPadding: "20px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // 브레이크 포인트 변경 시 보여질 슬라이드 수를 임의로 조정해 주세요.
          rows: 1, // 추가된 rows 옵션. 브레이크 포인트 변경 시 세로 1개 카로셀이 만들어짐
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // 브레이크 포인트 변경 시 보여질 슬라이드 수를 임의로 조정해 주세요.
          rows: 1, // 추가된 rows 옵션. 브레이크 포인트 변경 시 세로 1개 카로셀이 만들어짐
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        padding: "10px",
        top: "-15px",
        width: "100%",
        height: "100%",
        backgroundImage:
          myStories && myStories.length === 0 ? `url(${notale})` : "none",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Slider {...settings}>
        {myStories &&
          myStories.map((myStory, index) => {
            const firstPageId =
              myStory["finalScriptPageList"].length > 0
                ? myStory["finalScriptPageList"][0]["pageId"]
                : null;
            return firstPageId ? (
              <div key={index} className="card-padding">
                <div style={cardWrapperStyle}>
                  <AreaCard
                    key={index}
                    myStory={myStory}
                    alt={`Image ${index + 1}`}
                    firstPageId={firstPageId}
                  />
                  <Button
                    onClick={handleOpenDelete}
                    color="error"
                    style={deleteButtonStyle}
                  >
                    <DeleteForeverIcon />
                    <Modal
                      open={openDelete}
                      onClose={handleCloseDelete}
                      aria-labelledby="confirm-modal-title"
                      aria-describedby="confirm-modal-description"
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: "30%",
                          bgcolor: "background.paper",
                          boxShadow: 24,
                          p: 4,
                        }}
                      >
                        <Typography variant="h6">
                          삭제하면 같이 동화를 만든 사람의 동화도 삭제됩니다.
                        </Typography>
                        <Typography variant="h6">
                          그래도 삭제하시겠습니까?
                        </Typography>

                        <Button
                          onClick={() => {
                            deleteTaleHandler(myStory);
                            handleCloseDelete();
                          }}
                          variant="contained"
                          color="error"
                        >
                          예
                        </Button>
                        <Button
                          onClick={handleCloseDelete}
                          variant="outlined"
                          color="error"
                        >
                          아니요
                        </Button>
                      </Box>
                    </Modal>
                  </Button>
                </div>
              </div>
            ) : null;
          })}
      </Slider>
    </Box>
  );
};

export default Carousel;
