import axios from 'axios';
import { axiosInstance } from '../../../components/route/axiosInstance';

export default async function UserinfoAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axiosInstance.get(
      // `//i9c110.p.ssafy.io/api/users/get`,
      `users/get`
      // {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: sessionStorage.getItem('token'),
      //   },
      // }
    );
    return res;
  } catch (e) {
    console.log(e);
  }
}
