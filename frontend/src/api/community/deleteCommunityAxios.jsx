import axios from 'axios';
import { axiosInstance } from '../../components/route/axiosInstance';

export default async function deleteCommunityAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axiosInstance.delete(
      // `//i9c110.p.ssafy.io/api/community/delete/${props.communityId}`,
      `community/delete/${props.communityId}`,
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
