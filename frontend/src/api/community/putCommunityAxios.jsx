import axios from 'axios';

export default async function putCommunityAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.put(
      `//i9c110.p.ssafy.io/api/community/modify`,
      {
        content: props.content,
        taleId: props.taleId,
        title: props.title,
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