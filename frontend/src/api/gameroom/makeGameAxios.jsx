import axios from 'axios';

export default async function makeGameAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.get(
      // '//i9c110.p.ssafy.io/api/register-game',
      'http://localhost:8083/api/register-game',
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
