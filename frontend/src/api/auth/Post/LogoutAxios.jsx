import axios from 'axios';
import { axiosInstance } from '../../../components/route/axiosInstance';

async function LogoutAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axiosInstance.get(
      // '//i9c110.p.ssafy.io/api/auth/logout',
      'auth/logout',
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
  }
}

export default LogoutAxios;
