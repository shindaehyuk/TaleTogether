import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "./src/Logo.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import "./Community.css";

function Post({ post }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`postDetail/${post.communityId}`);
  }
  return (
    <div className="post-card-wrapper">
      <Card
        style={{ borderRadius: "20px" }}
        sx={{ maxWidth: 345 }}
        onClick={handleClick}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            image={post.taleImage || logo}
            alt="post image"
            sx={{
              objectFit: "cover", // 이미지를 카드에 맞게 확장해 자르지 않고 보여주기
              height: "210px", // 카드의 높이 고정
              width: "100%", // 카드의 너비 고정
            }}
          />
          <CardContent style={{ backgroundColor: "#FDFADF" }}>
            <Typography
              style={{ display: "flex", justifyContent: "space-between" }}
              gutterBottom
              variant="h5"
              component="div"
            >
              <div style={{ fontSize: "2rem", marginLeft: "15px" }}>
                <b>
                  {post.title.length > 10
                    ? `${post.title.slice(0, 10)}...`
                    : post.title}
                </b>
              </div>
              <div style={{ fontSize: "1rem" }}>{post.taleTitle}</div>
            </Typography>
            <div>
              <Typography style={{}} variant="body2" color="text.secondary">
                {post.content.length > 25
                  ? `${post.content.slice(0, 25)}...`
                  : post.content}
              </Typography>
              <hr />
              <Typography
                style={{ display: "flex", marginLeft: "14rem" }}
                variant="body2"
                color="text.secondary"
              >
                <FavoriteIcon style={{ color:"#ff0000", width: 20, marginRight: "10px" }} />
                {post.likeCount}
                <CommentIcon
                  style={{ width: 20, marginLeft: "10px", marginRight: "10px" }}
                />
                {post.commentCount}
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default Post;
