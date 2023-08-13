import axios from 'axios';

export default async function RefreshAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.get(
      `//localhost:8083/api/auth/refresh/${props.email}`,
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
