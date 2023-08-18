import { axiosInstance } from '../../components/route/axiosInstance';

export default async function saveTitleAxios(props) {
  console.log(props);
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axiosInstance.post(
      // '//i9c110.p.ssafy.io/api/create-chat',
      `tale/register/title`,
      {
        taleId: props.taleId,
        title: props.title,
        titleImage: props.titleImage,
      }
    );
    return res;
  } catch (e) {
    console.error(e);
    return false;
  }
}
