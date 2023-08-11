import React, { useState, useEffect } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import postCommentAxios from "../../api/comment/postCommentAxios";
import deleteCommentAxios from "../../api/comment/deleteCommentAxios";
import getUserCommunityAxios from "../../api/community/getUserCommunityAxios";
import putCommentAxios from "../../api/comment/putCommentAxios";
import deleteCommunityAxios from "../../api/community/deleteCommunityAxios";
import postlikesAddAxios from "../../api/likse/postlikesAddAxios";
import postlikesRemoveAxios from "../../api/likse/postlikesRemoveAxios";
import PostForm from "./PostForm";
import { createSelector } from "@reduxjs/toolkit";

// NavBar
function NavBar({ onButtonClick, onDeleteClick, isAuthor }) {
  return (
    <div>
      <div style={{ display: "flex" }}>
        {isAuthor && (
          <>
            <Button
              className="button-orange"
              sx={{ mt: "1rem", ml: "70%", width: "7rem" }}
              variant="text"
              onClick={onButtonClick}
            >
              수정하기
            </Button>
            <Button
              className="button-orange"
              sx={{ mt: "1rem", ml: "1%", width: "7rem" }}
              variant="text"
              onClick={onDeleteClick}
            >
              삭제하기
            </Button>
          </>
        )}
      </div>
      <hr />
    </div>
  );
}

// 댓글생성폼
function CommentForm({ onCommentCreate }) {
  // Axios를 위해 보내줄 3가지 데이터
  const [content, setContent] = useState("");
  const { communityId } = useParams();
  const userSliceSelector = (state) => state.userSlice;
  const userEmailSelector = createSelector(
    userSliceSelector,
    (userSlice) => userSlice.email
  );
  const userId = useSelector(userEmailSelector);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await postCommentAxios({
      content: content,
      communityId: communityId,
      email: userId,
    });

    if (result) {
      // 성공적으로 댓글을 생성한 경우
      // 폼 상태를 초기화합니다.
      setContent("");
      onCommentCreate(result);
    } else {
      // 생성 실패시 알림 처리를 적용하세요.
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setContent(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={handleInputChange}
        placeholder="댓글을 입력하세요."
      />
      <button type="submit">댓글 달기</button>
    </form>
  );
}

// 댓글목록
function Comment({ comment, onDelete, onUpdate, userId_now }) {
  // 댓글 수정
  const [editMode, setEditMode] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(comment.content);

  // 댓글 삭제
  const handleDelete = async () => {
    const result = await deleteCommentAxios({ commentId: comment.commentId });

    if (result) {
      onDelete(comment.commentId);
    } else {
      // 삭제 실패시 알림 처리를 적용하세요.
    }
  };

  // 댓글 수정
  const handleUpdate = async () => {
    const result = await putCommentAxios({
      content: updatedContent,
      commentId: comment.commentId,
    });

    if (result) {
      onUpdate(comment.commentId, updatedContent);
      setEditMode(false);
    } else {
      // 업데이트 실패시 알림 처리를 적용하세요.
    }
  };

  const handleInputChange = (e) => {
    setUpdatedContent(e.target.value);
  };

  return (
    <div>
      <div>
        <strong>{comment.userId}</strong>
        {/* 삭제 수정 인가처리 */}
        {comment.userId === userId_now && (
          <>
            <button onClick={() => setEditMode(!editMode)}>수정</button>
            <button onClick={handleDelete}>삭제</button>
          </>
        )}
      </div>
      {editMode ? (
        <div>
          <input
            type="text"
            value={updatedContent}
            onChange={handleInputChange}
          />
          <button onClick={handleUpdate}>확인</button>
        </div>
      ) : (
        <p>{comment.content}</p>
      )}
    </div>
  );
}

// 안에 보여지는 화면
function PostContent({ post, comments, onCommentCreate }) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div>
          <h2>{post.title}</h2>
          <h3>{post.taleTitle}</h3>
          <p>{post.content}</p>
          <p>좋아요 : {post.likes}</p>
          <p>댓글 수 : {post.commentList.length}</p>
        </div>
        <div>
          <img src={post.taleTitleImage} alt="" />
        </div>
      </div>

      <div className="comment">
        <CommentForm onCommentCreate={onCommentCreate} />
      </div>
    </div>
  );
}

function PostDetail() {
  const { communityId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [comments, setComments] = useState([]);

  // 수정모드
  const [editing, setEditing] = useState(false);

  // 좋아요
  const [liked, setLiked] = useState(false); // 좋아요 상태 관리
  const [likeCount, setLikeCount] = useState(0); // 좋아요 개수 관리

  // 현 유저의 ID
  const userSliceSelector = (state) => state.userSlice;
  const userEmailSelector = createSelector(
    userSliceSelector,
    (userSlice) => userSlice.email
  );
  const userId_now = useSelector(userEmailSelector);

  // 댓글 비동기 처리 (실패)
  const handleCommentCreated = (newComment) => {
    // 새 댓글을 기존 댓글 배열에 추가
    setComments((prevComments) => [...prevComments, newComment]);
  };

  // 댓글 삭제
  const handleCommentDeleted = (commentId) => {
    // 삭제된 댓글을 댓글 배열에서 제거
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.commentId !== commentId)
    );
  };

  // 댓글 수정
  const handleCommentUpdated = (commentId, updatedContent) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.commentId === commentId
          ? { ...comment, content: updatedContent }
          : comment
      )
    );
  };

  // 게시글 삭제
  const handleDeletePost = async () => {
    const result = await deleteCommunityAxios({ communityId: communityId });

    if (result) {
      // This line handles the navigation after deleting a post.
      // Replace history.push("/") with navigate("/");
      navigate("/");
    } else {
      // Handle error when deletion fails.
    }
  };

  // 좋아요 이벤트를 처리하는 함수
  const handleLikeClick = async () => {
    const likeProps = { id: post.communityId, email: userId_now };

    // 좋아요 상태에 따라 좋아요 추가 또는 제거
    if (liked) {
      await postlikesRemoveAxios(likeProps);
      setLikeCount(likeCount - 1);
    } else {
      await postlikesAddAxios(likeProps);
      setLikeCount(likeCount + 1);
    }

    // 좋아요 상태 변경
    setLiked(!liked);
  };

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      const res = await getUserCommunityAxios({ id: communityId });
      if (res) {
        setPost(res.data);
        setLikeCount(res.data.likes);
      }

      setLoading(false);
    }

    fetchPost();
  }, [communityId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!post) {
    return <Typography>게시글을 찾을 수 없습니다.</Typography>;
  }

  return (
    <>
      <Outlet />
      {!editing && (
        <NavBar
          onButtonClick={() => setEditing(!editing)}
          onDeleteClick={handleDeletePost}
          isAuthor={post.userId === userId_now}
        />
      )}
      {editing ? (
        console.log(post),
        <PostForm initialValues={post} setEditing={setEditing} />
      ) : (
        <PostContent post={post} onCommentCreate={handleCommentCreated} />
      )}

      {post.commentList.map((comment) => (
        <Comment
          key={comment.commentId}
          comment={comment}
          onDelete={handleCommentDeleted}
          onUpdate={handleCommentUpdated} // 수정된 댓글 내용을 갱신합니다.
          userId_now={userId_now}
        />
      ))}
    </>
  );
}

export default PostDetail;
