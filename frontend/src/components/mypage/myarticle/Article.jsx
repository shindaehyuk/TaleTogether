import { Box } from '@mui/material';

function Article() {
  const imagePaths = [  
    "../../assets/snoopy.png",
    "../../assets/mine.png",
    "../../assets/mypage.png",
    "../../assets/snoopy.png",
    "../../assets/mine.png",
    "../../assets/mypage.png",
  ];

  const story = [
    "옛날옛날",
    "이거 뭐임?",
    "이 사이트 재미있어요"
  ]

    return (
      <>
        <hr />
          {imagePaths.map((image, index) => (
            <div>
              <Box></Box>
            </div>
          ))}
      </>
    );
  }
  
  export default Article;