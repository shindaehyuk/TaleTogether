import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Modal, Box, Grid } from "@mui/material";
import getPageAxios from "../../../api/page/getPageAxios";
import { useState, useEffect } from "react";
import Book from "./Book";

export default function AreaCard({ myStory, alt, firstPageId, lastPageId }) {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState([]);
  const [pageId, setPageId] = useState(firstPageId);
  const [pageList, setPageList] = useState(myStory["pageList"]);

  useEffect(() => {
    if (open) {
      const getData = async () => {
        try {
          const response = await getPageAxios(pageId);
          setPage(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      getData();
    }
  }, [open, pageId]); // useEffect 함수는 'open'과 'pageId'가 변경될 때 호출됩니다.

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

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
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
          <Book pageList={pageList} />
        </Box>
      </Modal>
    </Card>
  );
}
