import axios from 'axios';
import { axiosInstance } from '../../../components/route/axiosInstance';

export default async function UpdateUserAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axiosInstance.patch(
      `//i9c110.p.ssafy.io/api/users/update-user`,
      // `http://localhost:8083/api/users/update-user`,
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
