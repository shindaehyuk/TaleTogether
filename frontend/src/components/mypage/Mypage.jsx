import Carousel from './mystory/Carousel';
import Article from './myarticle/Article';
import Like from './mylike/Like';
import MyStatus from './myupdate/MyStatus';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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
      {value === index && <Box sx={{ width: '100%', height: '100%' }}>{children}</Box>}
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

const MyPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid container width="100%" height="100%">
        <Grid item xs={4} container justifyContent="center" alignItems="center" width="100%" height="100%">
          <Box
            sx={{
              display: 'flex',
              backgroundColor: '#CCD5AE',
              borderRadius: '20px',
              width: '60%',
              height: '90%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              textColor="inherit"
              indicatorColor="inherit"
              aria-label="secondary tabs example"
              sx={{ width: '50%' }}
            >
              <Tab
                label="내 동화"
                {...a11yProps(0)}
                sx={{
                  display: 'flex',
                  width: '100%',
                  height: '10%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '20px',
                  marginTop: '20px',
                  marginBottom: '20px',
                  backgroundColor: value === 0 ? '#faedcd' : '#d4a373', // 선택된 탭일 때 배경 색상을 변경
                }}
              />
              <Tab
                label="나의 글"
                {...a11yProps(1)}
                sx={{
                  display: 'flex',
                  width: '100%',
                  height: '10%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '20px',
                  marginTop: '20px',
                  marginBottom: '20px',
                  backgroundColor: value === 1 ? '#faedcd' : '#d4a373',
                }}
              />
              <Tab
                label="좋아요"
                {...a11yProps(2)}
                sx={{
                  display: 'flex',
                  width: '100%',
                  height: '10%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '20px',
                  marginTop: '20px',
                  marginBottom: '20px',
                  backgroundColor: value === 2 ? '#faedcd' : '#d4a373',
                }}
              />
              <Tab
                label="정보수정"
                {...a11yProps(3)}
                sx={{
                  display: 'flex',
                  width: '100%',
                  height: '10%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '20px',
                  marginTop: '20px',
                  marginBottom: '20px',
                  backgroundColor: value === 3 ? '#faedcd' : '#d4a373',
                }}
              />
            </Tabs>
          </Box>
        </Grid>
        <Grid item xs={8} width="100%" height="100%" alignItems="center">
          <TabPanel value={value} index={0}>
            <Carousel></Carousel>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Article></Article>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Like></Like>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <MyStatus></MyStatus>
          </TabPanel>
        </Grid>
      </Grid>
    </>
  );
};

export default MyPage;
