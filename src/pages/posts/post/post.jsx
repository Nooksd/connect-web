import * as styled from "./postStyles.js";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchPost,
  commentPost,
  deleteComment,
  updatePost,
} from "@/store/slicers/postSlicer.js";

export const Post = ({ param, toastMessage, modalMessage, modalInfo }) => {
  const { post, isLoading } = useSelector((state) => state.post);
  const user = useSelector((state) => state.auth.user);

  const postId = param;

  const [comment, setComment] = useState("");
  const [deleteInfo, setDeleteInfo] = useState({});
  const [isLiked, setIsLiked] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (postId) {
      dispatch(fetchPost(postId));
    } else {
      navigate("/feed");
    }
  }, [dispatch]);

  useEffect(() => {
    if (post) setIsLiked(post.likes && post.likes.includes(user.id));
    console.log(post);
  }, [post]);

  const handleCommentPost = () => {
    if (comment.length === 0) return;
    const newComment = {
      text: comment,
      avatarUrl: user.profilePictureUrl,
      name: user.name,
      ownerId: user.id,
    };

    const newPost = {
      ...post,
      comments: [...(post.comments ?? []), newComment],
    }

    dispatch(updatePost(newPost));

    dispatch(
      commentPost({
        postId,
        comment: {
          text: comment,
        },
      })
    ).then((result) => {
      if (!result.meta.rejectedWithValue) {
        setComment("");
        toastMessage({
          danger: false,
          title: "Sucesso",
          message: "Comentário adicionado com sucesso",
        });
      } else {
        toastMessage({
          danger: true,
          title: "Erro",
          message: "Erro ao adicionar comentário",
        });
      }
    });
  };

  const handleDeleteComment = (commentId) => {
    const newPost = {
      ...post,
      comments: post.comments.filter((comment) => comment.id !== commentId),
    }

    dispatch(updatePost(newPost));

    dispatch(deleteComment({ postId, commentId })).then((result) => {
      if (!result.meta.rejectedWithValue) {
        toastMessage({
          danger: false,
          title: "Sucesso",
          message: "Comentário apagado com sucesso",
        });
      } else {
        toastMessage({
          danger: true,
          title: "Erro",
          message: "Erro ao apagar comentário",
        });
      }
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <styled.Main>
      <styled.Container>
        <styled.bigAvatar src={post.avatarUrl} />
        <styled.UserInfo>
          <styled.UserName>{post.name}</styled.UserName>
          <styled.UserRole>{post.role}</styled.UserRole>
        </styled.UserInfo>
        <styled.PostContent>
          <styled.PostText>
            <styled.quotes1 className="icon-quotes" />
            <styled.quotes2 className="icon-quotes" />
            {post.text}
          </styled.PostText>
          {post.imageUrl && (
            <styled.PostImageBox>
              <styled.PostImage src={post.imageUrl} />
            </styled.PostImageBox>
          )}
        </styled.PostContent>

        <styled.PostFooter>
          <styled.Hashtags>
            {post.hashtags &&
              post.hashtags.map((tag, index) => (
                <styled.Hashtag key={index}>#{tag}</styled.Hashtag>
              ))}
          </styled.Hashtags>
          <styled.PostTime>
            {new Date(post.createdAt).toLocaleString("pt-BR")}
          </styled.PostTime>
        </styled.PostFooter>
      </styled.Container>
      <styled.Separator />
      <styled.ListTile>
        <styled.TileLeading>
          <styled.Avatar src={user.profilePictureUrl} />
        </styled.TileLeading>
        <styled.TileContent>
          <styled.CommentInput
            type="text"
            placeholder="Escreva um comentário..."
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, 100))}
          />
        </styled.TileContent>
        <styled.CommentButton className="icon-send" onClick={() => handleCommentPost()} />
      </styled.ListTile>
      <styled.Separator />

      {post.comments &&
        post.comments.map((comment, index) => (
          <styled.ListTile key={index}>
            <styled.TileLeading>
              <styled.Avatar src={comment.avatarUrl} />
            </styled.TileLeading>
            <styled.TileContent>
              <styled.TileTitle>{comment.name}</styled.TileTitle>
              <styled.TileSubtitle>{comment.text}</styled.TileSubtitle>
            </styled.TileContent>
            {user.id === comment.ownerId && (
              <styled.CommentButton className="icon-trash" onClick={() => handleDeleteComment(comment.id)} />
            )}
          </styled.ListTile>
        ))}
    </styled.Main>
  );
};
