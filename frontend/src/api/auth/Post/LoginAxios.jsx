import axios from 'axios';

async function LoginAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.post(
      // '//i9c110.p.ssafy.io/api/auth/login',
      'http://localhost:8083/api/auth/login',
      {
        // id: '',
        // name: '',
        userId: props.email,
        password: props.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}

export default LoginAxios;
