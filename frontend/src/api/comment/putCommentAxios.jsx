import axios from 'axios';
import { axiosInstance } from '../../components/route/axiosInstance';

export default async function putCommentAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axiosInstance.put(
      // `//i9c110.p.ssafy.io/api/comment/modify`,
      `comment/modify`,
      {
        content: props.content,
        commentId: props.commentId,
      },
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
