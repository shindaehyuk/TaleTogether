import React, { useState, useEffect } from "react";
import postlikesAddAxios from "../../api/likse/postlikesAddAxios";
import postlikesRemoveAxios from "../../api/likse/postlikesRemoveAxios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import UserinfoAxios from "../../api/auth/Get/UserinfoAxios";

function HeartButton({ communityId, likedUsers, updateLikes, likes }) {
  const [liked, setLiked] = useState(false);
  const [userId, setUserId] = useState("");

  const user = async () => {
    const res = await UserinfoAxios();
    setUserId(res.data.userId);
  };
  useEffect(() => {
    user();
  });
  useEffect(() => {
    if (userId && likedUsers) {
      for (let i = 0; i < likedUsers.length; i++) {
        if (likedUsers[i].userId === userId) {
          setLiked(true);
          break;
        } else {
          setLiked(false);
        }
      }
    }
  }, [userId, likedUsers]);


  const handleLike = async () => {
    if (liked) {
      const result = await postlikesRemoveAxios({ id: communityId });
      if (result) {
        setLiked(false);
        updateLikes(likes - 1); // 좋아요 수 갱신
      }
    } else {
      const result = await postlikesAddAxios({ id: communityId });
      if (result) {
        setLiked(true);
        updateLikes(likes + 1); // 좋아요 수 갱신
      }
    }
  };

  return (
    <IconButton onClick={handleLike} color="danger">
      {liked ? (
        <FavoriteIcon /> // 좋아요한 경우 (하트 채움)
      ) : (
        <FavoriteBorderIcon /> // 좋아요 안한 경우 (하트 비움)
      )}
    </IconButton>
  );
}

export default HeartButton;
