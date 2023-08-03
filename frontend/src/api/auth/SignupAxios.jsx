import axios from 'axios';

async function SignupAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.post('https://i9c110.p.ssafy.io:8083/users/join', {
      userId: props.email,
      name: props.nickname,
      password: props.password,
    },{
      headers: {
        'Content-Type': 'application/json'
      }});
    console.log(res);
    return res;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export default SignupAxios;
