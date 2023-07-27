import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Nav from '../layouts/Nav';
import 'animate.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <span
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </span>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
function Main() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '90%',
          height: '90%',
          bgcolor: '#CCD5AE',
          borderRadius: '61px',
          // justifyContent: 'center',
          // alignItems: 'center',
          boxShadow: 5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '80%',
            height: '10%',
          }}
        >
          <Nav></Nav>
        </Box>
        {/* <Box
          sx={{
            width: '80%',
            height: '80%',
            backgroundImage: "url('./assets/Layerbg.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            borderBottomLeftRadius: '61px',
            borderBottomRightRadius: '61px',
            backgroundPosition: 'center', // 이미지를 가운데에 맞춰 보이도록 설정
          }}
        ></Box> */}
      </Box>
    </>
  );
}

export default Main;
