import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "animate.css";
import Intro from "../components/main/Intro";
import Community from "../components/community/Community";
import Game from "../components/game/Game";
import Mypage from "../components/mypage/Mypage";

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
      {value === index && (
        <Box sx={{ width: "100%", height: "100%" }}>{children}</Box>
      )}
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
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const TabComponent = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "90%",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
          sx={{ width: "50%" }}
        >
          <Tab
            label="main"
            {...a11yProps(0)}
            sx={{
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              backgroundColor: value === "one" ? "#fefae0" : "#d4a373", // 선택된 탭일 때 배경 색상을 변경
              width: "25%",
            }}
          />
          <Tab
            label="community"
            {...a11yProps(1)}
            sx={{
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              backgroundColor: value === "one" ? "#fefae0" : "#d4a373",
              width: "25%",
            }}
          />
          <Tab
            label="game"
            {...a11yProps(2)}
            sx={{
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              backgroundColor: value === "one" ? "#fefae0" : "#d4a373",
              width: "25%",
            }}
          />
          <Tab
            label="mypage"
            {...a11yProps(3)}
            sx={{
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              backgroundColor: value === "one" ? "#fefae0" : "#d4a373",
              width: "25%",
            }}
          />
        </Tabs>
      </Box>
      <Box
        sx={{
          width: "90%",
          height: "90%",
        }}
      >
        <TabPanel value={value} index={0}>
          <Intro></Intro>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Community></Community>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Game></Game>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Mypage></Mypage>
        </TabPanel>
      </Box>
    </>
  );
};

export default TabComponent;
