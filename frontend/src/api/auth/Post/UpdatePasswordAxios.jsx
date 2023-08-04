import axios from 'axios';

export default async function UpdatePasswordAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.patch(
      `//i9c110.p.ssafy.io/api/users/update-password/member/${props.email}`,
      {
        password: props.password,
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
