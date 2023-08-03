import * as React from 'react';
import './Intro.css';

export default function Intro() {
  return (
    <>
      <div class="cover">
        <div class="book">
          <label for="page-1" class="book__page book__page--1">
            <img src="../../assets/Layerbg2.png" alt="" />
          </label>

          <label for="page-2" class="book__page book__page--4">
            <img src="../../assets/twopeople.png" alt="" />
          </label>

          <input type="radio" name="page" id="page-1" />

          <input type="radio" name="page" id="page-2" />
          <label class="book__page book__page--2">
            <div class="book__page-front">
              <div class="page__content">
                <h1 class="page__content-book-title">Tale Together</h1>

                <p class="page__content-credits">
                  Introduction by
                  <span>신머혁</span>
                </p>

                <p class="page__content-credits">
                  Illustrations by
                  <span>범규오빠 잘생겼어요</span>
                </p>

                <div class="page__content-copyright">
                  <p>Made by</p>
                  <p>도와줘 GPT</p>
                </div>
              </div>
            </div>
            <div class="book__page-back">
              <div class="page__content">
                <h1 class="page__content-title">Contents</h1>
                <table class="page__content-table">
                  <tr>
                    <td align="left">Part I</td>
                    <td align="left">The Psycohistorians</td>
                    <td align="right">3</td>
                  </tr>
                  <tr>
                    <td align="left">Part II</td>
                    <td align="left">The Encyclopedists</td>
                    <td align="right">43</td>
                  </tr>
                  <tr>
                    <td align="left">Part III</td>
                    <td align="left">The Mayors</td>
                    <td align="right">87</td>
                  </tr>
                  <tr>
                    <td align="left">Part IV</td>
                    <td align="left">The Traders</td>
                    <td align="right">147</td>
                  </tr>
                  <tr>
                    <td align="left">Part V</td>
                    <td align="left">The Merchant Princes</td>
                    <td align="right">173</td>
                  </tr>
                </table>

                <div class="page__number">Tale Together</div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </>
  );
}
