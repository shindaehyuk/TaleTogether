import axios from 'axios';

export default async function putCommentAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.put(
      `//localhost:8083/api/comment/modify`,
      // `http://localhost:8083/api/comment/modify`,
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
    console.log(res);
    return res;
  } catch (e) {
    console.error(e);
    return false;
  }
}
