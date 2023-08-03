import axios from 'axios';

async function IdcheckAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.post('', {
      id: props,
    });
    console.log(res);
    return res;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export default IdcheckAxios;
