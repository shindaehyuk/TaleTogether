import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Login from '../components/admin/Login';
import Signup from '../components/admin/Signup';
import 'animate.css';
import './Admin.css';

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

export default function Admin() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '70%',
          height: '70%',
          bgcolor: '#ccd5ae',
          borderRadius: '61px',
          boxShadow: 20,
          '@media (max-width: 1200px)': {
            width: '100%',
            height: '80%',
          },
        }}
      >
        <Box
          className="imagehover"
          sx={{
            width: '80%',
            height: '100%', // 이미지의 높이를 자동으로 조정하여 비율 유지
            borderRadius: '61px',
          }}
        >
          <img
            src="./assets/Framebg.png"
            alt=""
            style={{
              width: '100%', // 이미지의 너비를 100%로 설정하여 부모 박스의 너비에 맞춤
              height: '100%', // 이미지의 높이를 자동으로 조정하여 비율 유지
              display: 'block', // inline 요소로부터의 여백 제거를 위해 블록 요소로 설정
            }}
          />
        </Box>
        <Box
          sx={{
            height: '100%',
            flexGrow: 1,
            borderRadius: '61px',
          }}
        >
          <img
            className="animate__animated animate__backInDown animate__delay-0.5s"
            src="./assets/Logo2-removebg-preview.png"
            alt=""
            style={{
              width: '40%', // 이미지의 너비를 100%로 설정하여 부모 박스의 너비에 맞춤
              height: '20%', // 이미지의 높이를 자동으로 조정하여 비율 유지
            }}
          />
          <Typography
            className="animate__animated animate__backInDown animate__delay-0.5s"
            variant="h3"
            color="black"
            sx={{ color: '#a65e45' }}
          >
            Tale Together
          </Typography>

          <Tabs
            textColor="inherit"
            indicatorColor="black"
            value={value}
            onChange={handleChange}
            centered
            sx={{ marginBottom: 3 }}
          >
            <Tab label="Login" {...a11yProps(0)} sx={{ marginRight: 3, fontWeight: 'bold' }} />
            <Tab label="Signup" {...a11yProps(1)} sx={{ marginLeft: 3, fontWeight: 'bold' }} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Login></Login>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Signup></Signup>
          </TabPanel>
        </Box>
      </Box>
    </>
  );
}
