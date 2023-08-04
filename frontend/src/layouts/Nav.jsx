import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import 'animate.css';
import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Nav.css';

function Nav() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '95%',
          height: '5%',
        }}
        className="link-container"
      >
        <Link to="intro" className="link">
          메인
        </Link>
        <Link to="community" className="link">
          커뮤니티
        </Link>
        <Link to="game" className="link">
          게임
        </Link>
        <Link to="mypage" className="link">
          마이페이지
        </Link>
      </Box>
      <Box
        sx={{
          width: '95%',
          height: '85%',
          backgroundColor: '#faedcd',
          borderBottomLeftRadius: '40px',
          borderBottomRightRadius: '40px',
          borderTopRightRadius: '40px',
          boxShadow: 0,
        }}
      >
        <Outlet></Outlet>
      </Box>
    </>
  );
}

export default Nav;
