import axios from 'axios';

export default async function UserinfoAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.get(
      `//i9c110.p.ssafy.io/api/users/get`,
      // `http://localhost:8083/api/users/get`,
      {
        headers: {
          Authorization: sessionStorage.getItem('token'),
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
