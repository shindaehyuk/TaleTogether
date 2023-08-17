import React, { useState, useEffect } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import postCommentAxios from "../../api/comment/postCommentAxios";
import deleteCommentAxios from "../../api/comment/deleteCommentAxios";
import getUserCommunityAxios from "../../api/community/getUserCommunityAxios";
import putCommentAxios from "../../api/comment/putCommentAxios";
import deleteCommunityAxios from "../../api/community/deleteCommunityAxios";
import UserinfoAxios from "../../api/auth/Get/UserinfoAxios";
import PostForm from "./PostForm";
import HeartButton from "./HeartButton";

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
  const [userId, setUserId] = useState("");

  const user = async () => {
    const res = await UserinfoAxios();
    setUserId(res.data.userId);
  };
  useEffect(() => {
    user();
  });

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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={content}
          onChange={handleInputChange}
          placeholder="댓글을 입력하세요."
        />
        <Button type="submit">댓글 달기</Button>
      </form>
    </div>
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
      {editMode ? (
        <div>
          <input
            type="text"
            value={updatedContent}
            onChange={handleInputChange}
          />
          <Button onClick={handleUpdate}>확인</Button>
        </div>
      ) : (
        <p style={{ maxHeight: "100px", overflowY: "auto" }}>
          {comment.userId} : {comment.content}
        </p>
      )}
      {comment.userId === userId_now && (
        <>
          <Button onClick={() => setEditMode(!editMode)}>수정</Button>
          <Button onClick={handleDelete}>삭제</Button>
        </>
      )}
    </div>
  );
}

// 안에 보여지는 화면
function PostContent({ post, onCommentCreate }) {
  // 좋아요 수 비동기화
  const [likes, setLikes] = useState(post.likes);

  const updateLikes = (newLikes) => {
    setLikes(newLikes);
  };

  return (
    <div
      className="DetailBody"
      style={{
        display: "flex",
        alignItems: "stretch",
      }}
    >
      <div
        className="left"
        style={{
          display: "flex",
          flexBasis: "50%",
          maxWidth: "50%",
          minWidth: "50%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ul className="list-inline">
          <li className="book_detail">
            <img src={post.taleTitleImage} alt="" />
          </li>
          <hr />
          <h3>{post.taleTitle}</h3>
        </ul>
      </div>

      <div
        className="right"
        style={{
          flexBasis: "50%",
          maxWidth: "50%",
          minWidth: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ lineHeight: "3rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>{post.title}</h1>
            <HeartButton
              communityId={post.communityId}
              likedUsers={post.likesList}
              updateLikes={updateLikes}
              likes={likes}
            />
          </div>
          <p style={{ maxHeight: "200px", overflowY: "auto" }}>
            {post.content}
          </p>
          {/* 좋아요 버튼 */}
          <div style={{ display: "flex" }}>
            <p style={{ fontSize: "1.5rem" }}>좋아요 : {likes}</p>
            <p style={{ fontSize: "1.5rem" }}>
              댓글 수 : {post.commentList.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostDetail() {
  const { communityId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // 새로고침하기 위한 변수
  const [postIdRef, setPostIdRef] = useState(null);

  const [comments, setComments] = useState([]);

  // 수정모드
  const [editing, setEditing] = useState(false);

  // 현 유저의 ID
  const [userId_now, setUserId] = useState("");

  const user = async () => {
    const res = await UserinfoAxios();
    setUserId(res.data.userId);
  };
  useEffect(() => {
    user();
  });

  // 댓글 비동기 처리 (실패)
  const handleCommentCreated = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment.data]);

    // Update the post state, adding the newly created comment to the list and updating the count
    setPost((prevState) => {
      let updatedPost = { ...prevState };
      updatedPost.commentList = [...prevState.commentList, newComment.data];
      return updatedPost; // 이 부분을 추가해 원본 post 상태를 업데이트하도록 합니다.
    });
  };

  // 댓글 삭제
  const handleCommentDeleted = (commentId) => {
    // Update the post state, removing the deleted comment from the list and updating the count
    setPost((prevState) => {
      let updatedPost = { ...prevState };
      updatedPost.commentList = prevState.commentList.filter(
        (comment) => comment.commentId !== commentId
      );
      return updatedPost;
    });
  };

  // 댓글 수정
  const handleCommentUpdated = (commentId, updatedContent) => {
    // Update the post state with modified content for a specific comment.
    setPost((prevState) => {
      let updatedComments = prevState.commentList.map((comment) =>
        comment.commentId === commentId
          ? { ...comment, content: updatedContent }
          : comment
      );

      return { ...prevState, commentList: updatedComments };
    });
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

  // getUserCommunityAxios를 통해서 게시글을 작성한 사람의 아이디를 가져와서 현재 userId와 비교하여 인가처리
  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      const res = await getUserCommunityAxios({ id: communityId });
      if (res) {
        setPost(res.data);
      }

      setLoading(false);
    }

    fetchPost();
  }, [communityId, postIdRef]);

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
        <PostForm
          initialValues={post}
          setEditing={setEditing}
          onUpdatePost={() => setPostIdRef(Date.now())} // 새로운 함수를 props로 추가
        />
      ) : (
        <PostContent
          post={post}
          onCommentCreate={handleCommentCreated}
          onCommentDelete={handleCommentDeleted}
          onCommentUpdate={handleCommentUpdated}
        />
      )}

      {!editing && ( // editing이 아닌 경우에만 댓글 폼을 표시합니다.
        <CommentForm onCommentCreate={handleCommentCreated}></CommentForm>
      )}

      {!editing && // editing이 아닌 경우에만 댓글 목록을 표시합니다.
        post.commentList.map((comment) => (
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
