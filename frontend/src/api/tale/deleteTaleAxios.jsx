import axios from 'axios';

export default async function deleteTaleAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.delete(
      `//i9c110.p.ssafy.io/api/tale/delete/${props.taleid}`,
      // `http://localhost:8083/api/tale/delete/${props.taleid}`,
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
