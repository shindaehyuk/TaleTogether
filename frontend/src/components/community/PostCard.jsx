import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from 'react-router-dom'

function PostCard({ title, content, id, img }) { // image를 img로 변경
  const navigate = useNavigate()

  function handleClick() {
    navigate(`postDetail/${id}`)
  }

  return (
    <Card sx={{ maxWidth: 345 }} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={img || "/static/images/cards/contemplative-reptile.jpg"} 
          alt="post image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}


export default PostCard;
