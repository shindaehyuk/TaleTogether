import axios from 'axios';

async function IdcheckAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.post(
      // '//i9c110.p.ssafy.io/api/users/check-duplicate',
      'http://localhost:8083/api/users/check-duplicate',
      {
        userId: props,
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

export default IdcheckAxios;
