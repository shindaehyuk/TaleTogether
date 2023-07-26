import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Login from '../components/admin/Login';
import Signup from '../components/admin/Signup';
import { styled } from '@mui/material/styles';

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
          boxShadow: 5,
        }}
      >
        <Box
          sx={{
            width: '70%',
            height: '100%',
            backgroundImage: "url('./assets/Framebg.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            borderRadius: '61px',
          }}
        ></Box>
        <Box sx={{ height: '100%', flexGrow: 1, borderRadius: '61px' }}>
          <Typography variant="h4" color="black" sx={{ marginY: 1 }}>
            Tale Together
          </Typography>

          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Login" {...a11yProps(0)} sx={{ marginRight: 5 }} />
            <Tab label="Signup" {...a11yProps(1)} sx={{ marginLeft: 5 }} />
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
