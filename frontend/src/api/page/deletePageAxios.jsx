import axios from 'axios';

export default async function deletePageAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.get(
      `//i9c110.p.ssafy.io/api/page/delete/${props.pageid}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res;
  } catch (e) {
    console.error(e);
    return false;
  }
}
