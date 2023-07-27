import * as React from 'react';
import Box from '@mui/material/Box';
import CommunityButton from '../components/main/CommunityButton';
import GameButton from '../components/main/GameButton';
import MainButton from '../components/main/MainButton';
import MyButton from '../components/main/MypageButton';
import '../components/main/Button.css'
import { Link } from 'react-router-dom';


export default function Main() {
  
  return (
    <>
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        width:'95%', 
        height: '95%', 
        flexGrow: 1, 
        bgcolor: '#CCD5AE',
        borderRadius: '61px',
        justifyContent: 'center',
        alignItems: 'center', 
        boxShadow: 5,
        }}
      >
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'row',
          width:'95%', 
          height: '2rem',
          mt: '1rem',
          alignItems: 'center',
          }}
        >
          <Link to='/community'><CommunityButton></CommunityButton></Link>
          <Link to='/game'><GameButton></GameButton></Link>
          <Link to='/main'><MainButton ></MainButton></Link>
          <MyButton state="Active"></MyButton>
        </Box>
        <Box sx={{ 
          width:'95%', 
          height: '85%', 
          bgcolor: '#FAEDCD',
          borderRadius: '61px',
          }}
        >
        </Box>
      </Box>
    </>
  );
}
