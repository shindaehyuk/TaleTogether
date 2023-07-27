import * as React from "react";
import Box from "@mui/material/Box";
import CommunityButton from "../main/CommunityButton";
import GameButton from "../main/GameButton";
import MainButton from "../main/MainButton";
import MyButton from "../main/MypageButton";
import { Link } from "react-router-dom";

export default function Game() {
  return (
    <>
      <h1>게임</h1>
      {/* <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '95%',
          height: '95%',
          flexGrow: 1,
          bgcolor: '#CCD5AE',
          borderRadius: '61px',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: 5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '95%',
            height: '2rem',
            mt: '1rem',
            alignItems: 'center',
          }}
        >
          <Link to="/community">
            <CommunityButton></CommunityButton>
          </Link>
          <GameButton state="Active"></GameButton>
          <Link to="/main">
            <MainButton></MainButton>
          </Link>
          <Link to="/mypage">
            <MyButton></MyButton>
          </Link>
        </Box>
        <Box
          sx={{
            width: '95%',
            height: '85%',
            bgcolor: '#FAEDCD',
            borderRadius: '61px',
          }}
        ></Box>
      </Box> */}
    </>
  );
}
