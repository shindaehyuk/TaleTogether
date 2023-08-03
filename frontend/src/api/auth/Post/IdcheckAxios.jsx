import axios from "axios";

async function IdcheckAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.get(
      "//i9c110.p.ssafy.io/api/",
      {
        id: props,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
}

export default IdcheckAxios;
