import axios from "axios";
import { axiosInstance } from "../../components/route/axiosInstance";

export default async function getTaleAllAxios() {
  try {
    const res = await axiosInstance.get(
      // `//i9c110.p.ssafy.io/api/tale/info/all/`,
      `tale/info/all`
      // {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: sessionStorage.getItem('token'),
      //   },
      // }
    );
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
}
