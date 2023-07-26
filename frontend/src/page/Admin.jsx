import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Login from '../components/admin/Login';
import Signup from '../components/admin/Signup';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
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
          width: '80%',
          height: '80%',
          bgcolor: '#e9edc9',
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
        <Box sx={{ height: '100%', flexGrow: 1, bgcolor: '#e9edc9' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{ display: 'flex', borderColor: 'divider', justifyContent: 'center' }}
          >
            <Tab label="Login" {...a11yProps(0)} />
            <Tab label="Signup" {...a11yProps(1)} />
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
