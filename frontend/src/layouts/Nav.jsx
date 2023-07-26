import { Link } from 'react-router-dom';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Nav() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          <Link to="/">메인페이지</Link>
          {/* <Link to="/mypage">마이페이지</Link> */}
          <Link to="/community">커뮤니티</Link>
          <Link to="/dashboard">대시보드</Link>
          <Link to="/admin">로그인</Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
