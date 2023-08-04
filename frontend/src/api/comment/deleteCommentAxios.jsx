import axios from 'axios';

export default async function deleteCommentAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.delete(
      `//i9c110.p.ssafy.io/api/comment/delete/${props.commentId}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
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
