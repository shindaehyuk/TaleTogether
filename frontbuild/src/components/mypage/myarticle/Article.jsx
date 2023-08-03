import Scroll from "./Scroll";

function Article() {
  const imagePaths = [  
    "../../assets/snoopy.png",
    "../../assets/mine.png",
    "../../assets/mypage.png",
    "../../assets/snoopy.png",
    "../../assets/mine.png",
  ];

  const stories = [
    "재미있어요",
    "무서워요",
    "집에갈래요",
    "오늘 점심",
    "뭐먹지",
    "저녁은?"
  ]
  
  
    return (
      <>
        <Scroll imagePaths={imagePaths} stories={stories}></Scroll>
      </>
    );
  }
  
  export default Article;