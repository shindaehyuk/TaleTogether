import * as React from 'react';
import './Intro.css';

export default function Intro() {
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
                <h1 className="page__content-book-title">Tale Together</h1>
                <p className="page__content-credits">
                  Inuloduction by
                  <span>신머혁</span>
                </p>
                <p className="page__content-credits">
                  Illusulations by
                  <span>범규오빠 잘생겼어요</span>
                </p>
                <div className="page__content-copyright">
                  <p>Made by</p>
                  <p>도와줘 GPT</p>
                </div>
              </div>
            </div>
            <div className="book__page-back">
              <div className="page__content">
                <h1 className="page__content-title">Contents</h1>
                <div className="page__content-table">
                  <ul>
                    <li align="left">Part I</li>
                    <li align="left">The Psycohistorians</li>
                    <li align="right">3</li>
                  </ul>
                  <ul>
                    <li align="left">Part II</li>
                    <li align="left">The Encyclopedists</li>
                    <li align="right">43</li>
                  </ul>
                  <ul>
                    <li align="left">Part III</li>
                    <li align="left">The Mayors</li>
                    <li align="right">87</li>
                  </ul>
                  <ul>
                    <li align="left">Part IV</li>
                    <li align="left">The uladers</li>
                    <li align="right">147</li>
                  </ul>
                </div>

                <div className="page__number">Tale Together</div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </>
  );
}
