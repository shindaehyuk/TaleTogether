import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Login from '../components/admin/Login';
import Signup from '../components/admin/Signup';
import Container from '@mui/material/Container';
import { grey } from '@mui/material/colors';

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
        <Box sx={{ p: 3 }}>
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
      <Box sx={{ width: '100%', height: '80%', bgcolor: 'grey' }}>세상에</Box>
      {/* <Box sx={{ justifyContent: 'space-between', flexGrow: 1, bgcolor: 'grey', m: 10 }}>
        <Tabs value={value} onChange={handleChange} sx={{ borderColor: 'divider' }}>
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Login></Login>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Signup></Signup>
        </TabPanel>
      </Box>
      <Box sx={{ justifyContent: 'space-between', flexGrow: 1, bgcolor: 'blue', my: 5 }}>
        <Tabs value={value} onChange={handleChange} sx={{ borderColor: 'divider' }}>
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Login></Login>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Signup></Signup>
        </TabPanel>
      </Box> */}
    </>
  );
}
