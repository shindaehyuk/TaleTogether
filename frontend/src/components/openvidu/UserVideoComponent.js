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
        width: '335px',
        height: '165px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d4a373',
        boxShadow: '10',
      }}
    >
      {streamManager !== undefined && <OpenViduVideoComponent streamManager={streamManager} />}
    </Box>
  );
}
