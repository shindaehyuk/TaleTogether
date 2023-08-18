import axios from 'axios';
import { axiosInstance } from '../../components/route/axiosInstance';

export default async function finishChatAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axiosInstance.post(
      // '//i9c110.p.ssafy.io/api/create-chat',
      `finish-chat`,
      {
        chatGptRequest: {},

        pageDtoRequest: {
          taleId: props,
        },
      }
    );
    return res;
  } catch (e) {
    console.error(e);
    return false;
  }
}
