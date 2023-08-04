import axios from 'axios';

export default async function postTaleAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.post(
      '//i9c110.p.ssafy.io/api/tale',
      {
        userid: props.email,
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
