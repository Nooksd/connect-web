import * as styled from "./postStyles.js";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchPost,
  commentPost,
  deleteComment,
  updatePost,
  updatePosts,
} from "@/store/slicers/postSlicer.js";
import { marked } from "marked";

export const Post = ({ param, toastMessage, modalMessage, modalInfo }) => {
  const { post, posts } = useSelector((state) => state.post);
  const user = useSelector((state) => state.auth.user);

  const postId = param;

  const [comment, setComment] = useState("");
  const [deleteInfo, setDeleteInfo] = useState({});

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
    if (modalInfo.response !== null) {
      switch (modalInfo.event) {
        case "deleteComment":
          if (modalInfo.response) handleDeleteComment();
          break;
      }

      modalMessage({
        title: "",
        message: "",
        response: null,
        event: null,
        userInput: null,
        hintText: "",
      });
    }
  }, [modalInfo]);

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
      comments: [newComment, ...(post.comments ?? [])],
    };
    const newPosts = posts.map((p) => (p.id === post.id ? newPost : p));

    dispatch(updatePost(newPost));
    dispatch(updatePosts(newPosts));

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

  const handleDeleteCommentConfirm = (commentId) => {
    setDeleteInfo({
      postId,
      commentId,
    });

    modalMessage({
      response: null,
      event: "deleteComment",
      title: "Tem certeza?",
      message: `Deseja excluir o comentário?`,
    });
  };

  const handleDeleteComment = () => {
    const newPost = {
      ...post,
      comments: post.comments.filter(
        (comment) => comment.id !== deleteInfo.commentId
      ),
    };

    dispatch(updatePost(newPost));

    dispatch(deleteComment(deleteInfo)).then((result) => {
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

  function Message({ text }) {
    return <span dangerouslySetInnerHTML={{ __html: marked(text) }} />;
  }

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
            <Message text={post.text ?? ""} />
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
        <styled.CommentButton
          className="icon-send"
          onClick={() => handleCommentPost()}
        />
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
              <styled.CommentButton
                className="icon-trash"
                onClick={() => handleDeleteCommentConfirm(comment.id)}
              />
            )}
          </styled.ListTile>
        ))}
    </styled.Main>
  );
};
