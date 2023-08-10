import React from 'react';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';
import { Box } from '@mui/material';

export default function UserVideoComponent({ streamManager }) {
  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  return (
    <Box
      sx={{
        width: '377px',
        height: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d4a373',
        boxShadow: '10',
        // borderRadius: '20px',
      }}
    >
      <OpenViduVideoComponent streamManager={streamManager} />
      {/* {streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={streamManager} />
          <div>
            <p>{getNicknameTag()}</p>
          </div>
        </div>
      ) : null} */}
    </Box>
  );
}
