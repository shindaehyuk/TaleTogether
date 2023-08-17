import * as React from 'react';
import './Intro.css';
import ErrorIcon from '@mui/icons-material/Error';
import { useEffect } from 'react';

export default function Intro() {
  useEffect(() => {
    localStorage.setItem('page', 0);
  });
  return (
    <>
      <div className="cover">
        <div className="book">
          <label htmlFor="page-1" className="book__page book__page--1">
            <div className="image-wrapper shine">
              <img src="../../assets/Layerbg2.png" alt="" />
            </div>
          </label>

          <label htmlFor="page-2" className="book__page book__page--4 ">
            <div className="image-wrapper shine">
              <img src="../../assets/twopeople.png" alt="" />
            </div>
          </label>

          <input type="radio" name="page" id="page-1" />

          <input type="radio" name="page" id="page-2" />
          <label className="book__page book__page--2">
            <div className="book__page-front">
              <div className="page__content">
                <h1 className="page__content-book-title animate__animated animate__fadeIn animate__delay-0.5s">
                  Tale Together
                </h1>
                <img
                  className="animate__animated animate__fadeIn animate__delay-1s"
                  style={{ width: '20%', height: '20%' }}
                  src="../../assets/Logo2-removebg-preview.png"
                  alt=""
                />

                <h2>세상에 단 하나뿐인 나만의 동화</h2>
                <p className="page__content-credits">다음 페이지로 이동 하세요--{'>'}</p>
                <div className="page__content-copyright">
                  <p>Made by 도와줘 GPT</p>
                </div>
              </div>
            </div>
            <div className="book__page-back">
              <div className="page__content">
                <h1 className="page__content-title">Game Guide</h1>
                <div className="page__content-table">
                  <ul>
                    <h2 style={{ textAlign: 'left' }}>1. 게임하기 탭을 눌러 페이지로 이동하세요.</h2>
                    <h2 style={{ textAlign: 'left' }}>2. 방을 만들거나 게임코드를 통해 방에 입장하세요.</h2>
                    <h2 style={{ textAlign: 'left' }}>3. 게임화면에서 게임시작버튼을 눌러 진행하세요.</h2>
                    <h2 style={{ textAlign: 'left' }}>4. 답변을 제출하여 게임을 진행하세요.</h2>
                    <h2 style={{ textAlign: 'left' }}>5. 동화완결을 눌러 동화를 만들어보세요.</h2>
                    <h2 style={{ textAlign: 'left' }}>6. 제목과 사진을 정하여 나만의 동화를 저장하세요.</h2>
                    <br />
                    <h2 style={{ textAlign: 'left' }}>
                      <ErrorIcon /> 동화를 저장하고 끝내야 내 동화에 저장이 완료됩니다.
                    </h2>
                  </ul>
                </div>

                <div className="page__content-copyright">
                  <p>Made by 도와줘 GPT</p>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </>
  );
}
