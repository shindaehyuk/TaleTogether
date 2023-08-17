import axios from 'axios';
import { axiosInstance } from '../../components/route/axiosInstance';

export default async function putCommunityAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axiosInstance.put(
      // `//i9c110.p.ssafy.io/api/community/modify`,
      `community/modify`,
      {
        taleId: props.taleId,
        content: props.content,
        title: props.title,
        communityId: props.communityId,
      },
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
