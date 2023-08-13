import axios from 'axios';

export default async function getTaleAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.get(
      `//localhost:8083/api/tale/info/${props.taleid}`,
      // `http://localhost:8083/api/tale/info/${props.taleid}`,
      {},
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
