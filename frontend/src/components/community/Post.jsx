import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Community.css";

function Post({ post }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`postDetail/${post.communityId}`);
  }

  return (
    <div className="post-card-wrapper">
      <Card sx={{ maxWidth: 345 }} onClick={handleClick}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={post.img || "/static/images/cards/contemplative-reptile.jpg"}
            alt="post image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.content}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default Post;
