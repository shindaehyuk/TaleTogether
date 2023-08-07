import axios from 'axios';

export default async function getPageAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.get(
      // `//i9c110.p.ssafy.io/api/page/detail/${props.pageid}`,
      `http://localhost:8083/api/page/detail/${props.pageid}`,
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
