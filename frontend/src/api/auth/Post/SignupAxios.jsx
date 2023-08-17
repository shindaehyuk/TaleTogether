import axios from 'axios';
import { axiosInstance } from '../../../components/route/axiosInstance';

async function SignupAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axiosInstance.post(
      // '//i9c110.p.ssafy.io/api/users/join',
      'users/join',
      {
        userId: props.email,
        name: props.nickname,
        password: props.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('token'),
        },
      }
    );
    return res;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export default SignupAxios;
