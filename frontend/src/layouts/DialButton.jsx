import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";

const actions = [
  // { icon: <FileCopyIcon />, name: "Copy" },
  // { icon: <SaveIcon />, name: "Save" },
  // { icon: <PrintIcon />, name: "Print" },
  // { icon: <ShareIcon />, name: "Share" },
  { icon: <LogoutIcon />, name: "Logout" },
];

export default function SpeedDialTooltipOpen() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <SpeedDial
      ariaLabel="SpeedDial tooltip example"
      sx={{ position: "absolute", bottom: "5%", right: "5%" }}
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipOpen
          onClick={logoutHandler}
        />
      ))}
    </SpeedDial>
  );
}