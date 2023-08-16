import axios from 'axios';

export default async function deleteCommunityAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.delete(
      `//i9c110.p.ssafy.io/api/community/delete/${props.communityId}`,
      // `http://localhost:8083/api/community/delete/${props.communityId}`,
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
