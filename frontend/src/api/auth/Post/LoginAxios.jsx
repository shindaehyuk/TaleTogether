import axios from 'axios';
import { axiosInstance } from '../../../components/route/axiosInstance';

async function LoginAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axiosInstance.post(
      // '//i9c110.p.ssafy.io/api/auth/login',
      'auth/login',
      {
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
  } catch (e) {}
}

export default LoginAxios;
