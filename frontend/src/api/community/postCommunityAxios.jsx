import axios from 'axios';

export default async function postCommunityAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.post(
      `//i9c110.p.ssafy.io/api/community/register`,
      // `http://localhost:8083/api/community/register`,
      {
        content: props.content,
        taleId: props.taleId,
        title: props.title,
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
