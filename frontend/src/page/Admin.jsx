import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Login from '../components/admin/Login';
import Signup from '../components/admin/Signup';
import { useState } from 'react';
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
  const [value, setValue] = useState(0);

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
          height: '80%',
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
          sx={{
            width: '80%',
            height: '100%',
          }}
        >
          <img
            src="./assets/Framebg.png"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
            }}
          />
        </Box>
        <Box
          sx={{
            height: '100%',
            flexGrow: 1,
            borderRadius: '61px',
            marginTop: '10px',
          }}
        >
          <Typography
            className="animate__animated animate__backInDown animate__delay-0.5s"
            variant="h3"
            color="black"
            sx={{ color: '#a65e45', marginY: 1 }}
          >
            Tale Together
          </Typography>
          <img
            className="animate__animated animate__backInDown animate__delay-0.5s"
            src="./assets/Logo2-removebg-preview.png"
            alt=""
            style={{
              width: '30%',
              height: '15%',
            }}
          />

          <Tabs
            textColor="inherit"
            indicatorColor="black"
            value={value}
            onChange={handleChange}
            centered
            sx={{ marginTop: 1, marginBottom: 2 }}
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
