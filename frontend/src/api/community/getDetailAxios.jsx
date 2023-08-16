import axios from 'axios';
import { axiosInstance } from '../../components/route/axiosInstance';

export default async function getDetailAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axiosInstance.get(
      // `//i9c110.p.ssafy.io/api/community/detail`,
      `community/detail`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('token'),
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
