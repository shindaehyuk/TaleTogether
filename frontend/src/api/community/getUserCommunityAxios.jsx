import axios from 'axios';

export default async function getUserCommunityAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.get(
      `//i9c110.p.ssafy.io/api/community/info/${props.id}`,
      // `http://localhost:8083/api/community/info/${props.id}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(res);
    console.log(props)
    return res;
  } catch (e) {
    console.error(e);
    console.log(props)
    return false;
  }
}
