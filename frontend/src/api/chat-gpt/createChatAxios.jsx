import axios from 'axios';
import { axiosInstance } from '../../components/route/axiosInstance';

export default async function createChatAxios(props, data) {
  console.log(props, data);
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axiosInstance.post(
      // '//i9c110.p.ssafy.io/api/create-chat',
      'create-chat',
      {
        chatGptRequest: {
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant.',
            },
            {
              role: 'user',
              content: data,
            },
          ],
        },
        userChoiceRequest: {
          backGround: props.backGround,
          player1: props.player1,
          player2: props.player2,
          player1Character: props.player1Character,
          player2Character: props.player2Character,
          turn: props.turn,
        },
        pageDtoRequest: {
          taleId: props.taleId,
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
