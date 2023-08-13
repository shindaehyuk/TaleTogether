import axios from 'axios';

export default async function confirmMailAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.post(
      '//localhost:8083/api/mail/confirm',
      {
        code: props.code,
        email: props.email,
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
