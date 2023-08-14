import axios from 'axios';

export default async function UpdateUserAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.patch(
      `//i9c110.p.ssafy.io/api/users/update-user`,
      // `//localhost:8083/api/users/update-user`,
      {
        name: props.newName,
      },
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
