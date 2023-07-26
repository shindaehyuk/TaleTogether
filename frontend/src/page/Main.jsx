import * as React from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';
import styled from 'styled-components';

const TabMenu = styled.ul`
  display: flex;
  flex-direction: row;
  .submenu {
    width:8rem;
    height: 4rem;
    background-color: #D4A373;
    border-radius: 61px;
    cursor: pointer;
  }

  .focused {
   //선택된 Tabmenu 에만 적용되는 CSS를 구현
    background-color: #FAEDCD;
  }

  & div.desc {
    text-align: center;
  }
`;


export default function Main() {
  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    { name: 'Tab1', content: '메인페이지' },
    { name: 'Tab2', content: '시작하기' },
    { name: 'Tab3', content: '커뮤니티' },
    { name: 'Tab4', content: '마이페이지' },
  ];

  const selectMenuHandler = (index) => {
    clickTab(index);
  };

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
          <TabMenu>
            {menuArr.map((el,index) => (
                <Box component="div" className={index === currentTab ? "submenu focused" : "submenu" }
                onClick={() => selectMenuHandler(index)}>{el.content}</Box>
              ))}
          </TabMenu>
        </Box>
        <Box sx={{ 
          width:'95%', 
          height: '90%', 
          bgcolor: '#FAEDCD',
          borderRadius: '61px',
          }}
        >
        </Box>
      </Box>
    </>
  );
}