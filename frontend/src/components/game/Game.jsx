import * as React from 'react';
import Box from '@mui/material/Box';
import './Game.css';

export default function Game() {
  return (
    <>
      <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <main class="page-content">
            <div class="card">
              <div class="content">
                <h2 class="title">시작하기</h2>
                <p class="copy">
                  Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains
                </p>
                <button class="btn">View Trips</button>
              </div>
            </div>
            <div class="card">
              <div class="content">
                <h2 class="title">방만들기</h2>
                <p class="copy">Plan your next beach trip with these fabulous destinations</p>
                <button class="btn">View Trips</button>
              </div>
            </div>
          </main>
        </Box>
      </Box>
    </>
  );
}
