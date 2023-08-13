import axios from 'axios';

export default async function getCommentAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.get(
      `//localhost:8083/api/comment/info/${props.commentId}`,
      // `http://localhost:8083/comment/info/${props.commentId}`,
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
