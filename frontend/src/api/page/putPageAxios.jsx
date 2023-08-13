import axios from 'axios';

export default async function putPageAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.put(
      `//localhost:8083/api/page/modify`,
      // `http://localhost:8083/api/page/detail/${props.pageid}`,
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
