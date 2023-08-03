import axios from "axios";

async function CommentAxios(props) {
  const headers = {
    "Content-Type": "application/json", // JSON 형식으로 데이터를 보낼 것이므로 'application/json' 설정
    // 추가적인 헤더 필요시 여기에 추가
  };
  try {
    await axios.post(
      "//i9c110.p.ssafy.io/api/comment",
      {
        content: props.content,
      },
      headers
    );
  } catch (e) {
    console.error(e);
  }
}

export default CommentAxios;
