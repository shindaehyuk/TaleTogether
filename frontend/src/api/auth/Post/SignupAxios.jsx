import axios from 'axios';

async function SignupAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.post(
      '//localhost:8083/api/users/join',
      // "http://localhost:8083/api/users/join",
      {
        userId: props.email,
        name: props.nickname,
        password: props.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(res);
    return res;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export default SignupAxios;
