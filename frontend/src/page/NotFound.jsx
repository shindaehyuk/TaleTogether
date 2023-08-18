import React from 'react';
import { useEffect, useState } from 'react';
import './NotFound.css';

function NotFound() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    setTimeout(() => {
      window.location.href = '/intro';
    }, 3000);
  });

  useEffect(() => {
    setTimeout(() => {
      setCount(count - 1);
    }, 1000);
  }, [count]);

  return (
    <>
      <div id="main">
        <div class="fof" style={{ fontFamily: 'omyu_pretty' }}>
          <h1>Error 404</h1>
          <br />
          <h1>{count}초 후 메인페이지로 이동합니다.</h1>
        </div>
      </div>
    </>
  );
}

export default NotFound;
