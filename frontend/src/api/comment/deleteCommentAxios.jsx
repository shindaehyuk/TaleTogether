import axios from 'axios';
import { axiosInstance } from '../../components/route/axiosInstance';

export default async function deleteCommentAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axiosInstance.delete(
      // `//i9c110.p.ssafy.io/api/comment/delete/${props.commentId}`,
      `comment/delete/${props.commentId}`,
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
