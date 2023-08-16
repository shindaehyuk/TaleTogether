import axios from 'axios';
import { axiosInstance } from '../../../components/route/axiosInstance';

async function IdcheckAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axiosInstance.post(
      // '//i9c110.p.ssafy.io/api/users/check-duplicate',
      'users/check-duplicate',
      {
        userId: props,
      }
      // {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // }
    );
    console.log(res);
    return res;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export default IdcheckAxios;
