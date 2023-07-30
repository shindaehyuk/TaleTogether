import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Nav from "../layouts/Nav";
import DialButton from "../layouts/DialButton";

function Main() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          bgcolor: "#CCD5AE",
          borderRadius: "61px",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: 20,
        }}
      >
        <Nav></Nav>
        <DialButton></DialButton>
      </Box>
    </>
  );
}

export default Main;
