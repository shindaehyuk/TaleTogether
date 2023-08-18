import React from 'react';
import './MovingFox.css';

function MovingFox() {
  return (
    <>
      <div className="fox">
        <div className="leg-outer">
          <div className="leg">
            <div className="paw">
              <div className="log">
                <div className="log-inner"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="leg-outer">
          <div className="leg">
            <div className="paw">
              <div className="log">
                <div className="log-inner"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="hind-leg-outer">
          <div className="hind-leg-outer2">
            <div className="hind-paw">
              <div className="hind-log">
                <div className="hind-log-inner"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="hind-leg-outer">
          <div className="hind-leg-outer2">
            <div className="hind-paw">
              <div className="hind-log">
                <div className="hind-log-inner"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="body">
          <div className="head">
            <div className="ears">
              <div className="ear"></div>
              <div className="ear"></div>
            </div>
            <div className="face"></div>
            <div className="snout"></div>
          </div>
          <div className="tail">
            <div className="tail">
              <div className="tail">
                <div className="tail">
                  <div className="tail">
                    <div className="tail"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tail2">
              <div className="tail">
                <div className="tail">
                  <div className="tail">
                    <div className="tail">
                      <div className="tail"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="textanimation">이미지와 스크립트를 생성중입니다...</div>
      </div>

      <div className="snow"></div>
    </>
  );
}

export default MovingFox;
