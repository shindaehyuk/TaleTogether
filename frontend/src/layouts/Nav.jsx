import * as React from 'react';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PersonIcon from '@mui/icons-material/Person';
import 'animate.css';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Nav.css';
import Setting from './Setting';
import { useEffect } from 'react';

function Nav() {
  const [activeLinkIndex, setActiveLinkIndex] = useState('');

  // 페이지 로드 시 localStorage에서 값을 읽어옴
  useEffect(() => {
    const storedIndex = sessionStorage.getItem('activeLinkIndex');
    if (storedIndex !== null) {
      setActiveLinkIndex(parseInt(storedIndex, 10));
    }
  }, []);

  const handleLinkClick = (index) => {
    setActiveLinkIndex(index);
    sessionStorage.setItem('activeLinkIndex', index);
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '95%',
          height: '7%',
        }}
        className="link-container"
      >
        <Link to="intro" className={`link ${activeLinkIndex === 0 ? 'active' : ''}`} onClick={() => handleLinkClick(0)}>
          <HomeIcon />
          메인
        </Link>
        <Link
          to="community"
          className={`link ${activeLinkIndex === 1 ? 'active' : ''}`}
          onClick={() => handleLinkClick(1)}
        >
          <LocalLibraryIcon />
          커뮤니티
        </Link>
        <Link to="game" className={`link ${activeLinkIndex === 2 ? 'active' : ''}`} onClick={() => handleLinkClick(2)}>
          <SportsEsportsIcon />
          게임
        </Link>
        <Link
          to="mypage"
          className={`link ${activeLinkIndex === 3 ? 'active' : ''}`}
          onClick={() => handleLinkClick(3)}
        >
          <PersonIcon />
          내프로필
        </Link>
        <Link className="setting">
          <Setting />
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
        }}
      >
        <Outlet></Outlet>
      </Box>
    </>
  );
}

export default Nav;
