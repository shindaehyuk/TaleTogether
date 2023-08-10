import axios from 'axios';

export default async function postCommentAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.post(
      `//i9c110.p.ssafy.io/api/comment/register`,
      // `http://localhost:8083/api/comment/register`,
      {
        content: props.content,
        communityId: props.communityId,
        userId: props.email,
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
