import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <>
      <Link to="/">메인페이지</Link>
      <Link to="/login">로그인</Link>
      <Link to="/signup">회원가입</Link>
      <Link to="/mypage">마이페이지</Link>
    </>
  );
}

export default Nav;
