import axios from 'axios';

export default async function postTaleAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.post(
      '//localhost:8083/api/tale/regiser',
      // 'http://localhost:8083/api/tale/regiser',
      {
        userid: null,
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
