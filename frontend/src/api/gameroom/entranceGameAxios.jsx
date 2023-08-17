import axios from 'axios';
import { axiosInstance } from '../../components/route/axiosInstance';

export default async function entranceGamxAxios(sessionId) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axiosInstance.get(
      // `//i9c110.p.ssafy.io/api/enter-game/${sessionId}`,
      `enter-game/${sessionId}`,
      {},
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
