import axios from 'axios';
import { axiosInstance } from '../../../components/route/axiosInstance';

export default async function DeleteUserAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.delete(
      `//i9c110.p.ssafy.io/api/users/delete-user`,
      // `http://localhost:8083/api/users/delete-user`,
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
