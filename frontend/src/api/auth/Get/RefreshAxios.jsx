import axios from 'axios';

export default async function RefreshAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.get(
      // `//i9c110.p.ssafy.io/api/auth/refresh`,
      `//localhost:8083/api/auth/refresh`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('refreshToken'),
        },
      }
    );
    console.log(res);
    sessionStorage.setItem('token', res.data.accessToken);
    localStorage.setItem('refreshToken', res.data.refreshToken);
    return res;
  } catch (e) {
    console.error(e);
    return false;
  }
}
