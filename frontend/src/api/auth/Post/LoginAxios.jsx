import axios from "axios";

async function LoginAxios(props) {
  const headers = {
    "Content-Type": "application/json", // JSON 형식으로 데이터를 보낼 것이므로 'application/json' 설정
    // 추가적인 헤더 필요시 여기에 추가
  };
  try {
    // POST 요청은 body에 실어 보냄
    await axios.post(
      "//i9c110.p.ssafy.io/api/auth/login",
      {
        id: props.email,
        password: props.pasword,
      },
      headers
    );
  } catch (e) {
    console.error(e);
  }
}

export default LoginAxios;
