import axios from 'axios';

export default async function postlikesRemoveAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.post(
      `//i9c110.p.ssafy.io/api/likes/remove`,
      // `http://localhost:8083/api/likes/remove`,
      {
        communityId: props.id,
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
