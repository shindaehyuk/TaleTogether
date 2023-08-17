import axios from 'axios';
import { axiosInstance } from '../../components/route/axiosInstance';

export default async function getCommentAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axiosInstance.get(
      // `//i9c110.p.ssafy.io/api/comment/info/${props.commentId}`,
      `comment/info/${props.commentId}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res;
  } catch (e) {
    console.error(e);
    return false;
  }
}
