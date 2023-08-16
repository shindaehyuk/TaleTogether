import axios from 'axios';
import { axiosInstance } from '../../components/route/axiosInstance';
export default async function postCommentAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axiosInstance.post(
      // `//i9c110.p.ssafy.io/api/comment/register`,
      `comment/register`,
      {
        content: props.content,
        communityId: props.communityId,
        userId: null,
      },
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
