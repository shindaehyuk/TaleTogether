import axios from 'axios';
import { axiosInstance } from '../../components/route/axiosInstance';

export default async function deleteTaleAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axiosInstance.delete(
      // `//i9c110.p.ssafy.io/api/tale/delete/${props.taleId}`,
      `tale/delete/${props.taleId}`,
      {},
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
