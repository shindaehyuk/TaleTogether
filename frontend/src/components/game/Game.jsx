import * as React from "react";
import Box from "@mui/material/Box";

export default function Game() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            width: "50%",
            height: "100%",
            bgcolor: "#CCD5AE",
            borderRadius: "61px",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: 5,
          }}
        />
        <Box
          sx={{
            display: "flex",
            width: "50%",
            height: "100%",
            flexGrow: 1,
            bgcolor: "#CCD5AE",
            borderRadius: "61px",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: 5,
          }}
        ></Box>
      </Box>
    </>
  );
}
