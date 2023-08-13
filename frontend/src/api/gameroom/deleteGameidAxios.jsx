import axios from 'axios';

export default async function deleteGamdidAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.delete(
      '//localhost:8083/api/delete-game',
      {
        sessionId: props.id,
      },
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
