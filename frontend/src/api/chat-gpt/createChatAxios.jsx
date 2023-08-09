import axios from 'axios';

export default async function createChatAxios(props) {
  console.log(props);
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.post(
      '//i9c110.p.ssafy.io/api/create-chat',
      // 'http://localhost:8083/api/create-chat',
      {
        chatGptRequest: {
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant.',
            },
            {
              role: 'user',
              content: props.content,
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
          taleId: 1,
        },
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
