import axios from 'axios';

export default async function makeGameAxios(props) {
  const userId = sessionStorage.getItem('email');
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.post(
      // '//i9c110.p.ssafy.io/openvidu/api/sessions',
      `http://localhost:8083/api/register-game`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${btoa('OPENVIDUAPP:Theatergloate')}`,
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
