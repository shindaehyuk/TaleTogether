import axios from "axios";

export default async function getTaleAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.get(
      // `//i9c110.p.ssafy.io/api/tale/info/${props.taleId}`,
      `http://localhost:8083/api/tale/info/${props.taleId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token"),
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
