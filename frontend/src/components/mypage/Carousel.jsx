import "./Carousel.css";
import { useEffect, useRef, useState } from "react";

function Carousel() {
  const container_Carousel = useRef();
  const [nowX, setNowX] = useState(0);
  useEffect(() => {
    container_Carousel.current.style.transform = `translateX(${nowX}vw)`;
  }, [nowX]);
  // useState 말고 useEffect를 이용해야할듯.
  const clickLeftButton = () => {
    // setNowX(nowX + 20);
    setNowX((prop) => prop + 20);
    console.log(`it's work ${nowX}`);
  };
  const clickRightButton = () => {
    setNowX(nowX - 20);
    console.log(`it's work ${nowX}`);
  };
  return (
    <div className="body" style={{ overflow: "hidden" }}>
      <div>{nowX}</div>
      <label className="left" onClick={clickLeftButton}>
        left
      </label>
      <label className="right" onClick={clickRightButton}>
        right
      </label>
      <div className="container_Carousel" ref={container_Carousel}>
        <div className="inner">
          <img src={"assets/mine.png"} alt="" />
        </div>
        <div className="inner">
          <img src={"assets/snoopy.png"} alt="" />
        </div>
        <div className="inner">
          <img src={"assets/mine.png"} alt="" />
        </div>
        <div className="inner">
          <img src={"assets/snoopy.png"} alt="" />
        </div>
        <div className="inner">
          <img src={"assets/mine.png"} alt="" />
        </div>
        <div className="inner">
          <img src={"assets/snoopy.png"} alt="" />
        </div>
        <div className="inner">
          <img src={"assets/mine.png"} alt="" />
        </div>
        <div className="inner">
          <img src={"assets/snoopy.png"} alt="" />
        </div>
        <div className="inner">
          <img src={"assets/mine.png"} alt="" />
        </div>
        <div className="inner">
          <img src={"assets/snoopy.png"} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Carousel;