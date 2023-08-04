import axios from 'axios';

export default async function createChatAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.post(
      '//i9c110.p.ssafy.io/api/create-chat',
      {
        chatGptRequest: {
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant.',
            },
            {
              role: 'user',
              content: '1 ',
            },
          ],
        },
        userChoiceRequest: {
          backGround: '산',
          player1: '범진',
          player2: '범진2',
          player1Character: '용감한',
          player2Character: '소심한',
          turn: '50',
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
