import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Modal, Box } from "@mui/material";
import { useState } from "react";
import SummarizeBook from "./Book";

export default function AreaCard({ myStory, alt, firstPageId }) {
  const [open, setOpen] = useState(false);
  const [pageId, setPageId] = useState(firstPageId);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPageId(firstPageId);
  };

  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const boxStyle = {
    position: "absolute",
    display: "flex",
    width: "80%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    overflow: "auto",
    backgroundImage: `url("../../assets/BookTemplate.jpg")`,
    backgroundSize: "101.5% 100%",
  };

  console.log(myStory);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          className="card-img"
          height="100"
          image={myStory.titleImage}
          alt={{ alt }}
          onClick={handleOpen}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {myStory.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        style={modalStyle}
      >
        <Box sx={boxStyle}>
          <SummarizeBook pageList={myStory["finalScriptPageList"]} />
        </Box>
      </Modal>
    </Card>
  );
}
