import axios from 'axios';

export default async function putCommunityAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.put(
      `//i9c110.p.ssafy.io/api/community/modify`,
      // `http://localhost:8083/api/community/modify`,
      {
        taleId: props.taleId,
        content: props.content,
        title: props.title,
        communityId: props.communityId,
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
