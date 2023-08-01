import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';
import ActionAreaCard from './Card';

// 이전 화살표 디자인
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: 'block', background: 'red' }} onClick={onClick} />;
}

// 다음 화살표 디자인
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: 'block', background: 'green' }} onClick={onClick} />;
}

//이미지 파일 받아올 곳
const imagePaths = [
  '../../assets/snoopy.png',
  '../../assets/mine.png',
  '../../assets/mypage.png',
  '../../assets/snoopy.png',
  '../../assets/mine.png',
  '../../assets/mypage.png',
];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // 한 번에 보여질 슬라이드 수
    slidesToScroll: 1, // 한 번에 스크롤될 슬라이드 수
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        {imagePaths.map((imagePath, index) => (
          <ActionAreaCard key={index} src={imagePath} alt={`Image ${index + 1}`} />
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
