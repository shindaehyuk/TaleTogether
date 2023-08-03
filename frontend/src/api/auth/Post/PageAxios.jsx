import axios from "axios";

async function PageAxios(props) {
  const headers = {
    "Content-Type": "application/json", // JSON 형식으로 데이터를 보낼 것이므로 'application/json' 설정
    // 추가적인 헤더 필요시 여기에 추가
  };
  try {
    await axios.post(
      "//i9c110.p.ssafy.io/api/page",
      {
        content: props.content,
        image: props.image,
        taleId: props.taleId,
      },
      headers
    );
  } catch (e) {
    console.error(e);
  }
}

export default PageAxios;
