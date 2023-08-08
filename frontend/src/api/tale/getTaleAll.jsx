import axios from 'axios';

export default async function getTaleAllAxios(userId) {
  try {
    const res = await axios.get(
      `//i9c110.p.ssafy.io/api/tale/info/all/${userId}`,
      // `http://localhost:8083/api/tale/info/all/${userId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data;
  } catch (e) {
    console.error(e);
    return false;
  }
}
