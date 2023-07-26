import axios from 'axios';
import React from 'react';

async function SignupAxios(props) {
  try {
    // POST 요청은 body에 실어 보냄
    const res = await axios.post('/user', {
      id: props.email,
      name: props.nickname,
      password: props.pasword,
    });
    console.log(res);
    return res;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export default SignupAxios;
