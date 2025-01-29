import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPosts,
  likePost,
  dislikePost,
  createPost,
  deletePost,
  updatePosts,
} from "@/store/slicers/postSlicer.js";
import { uploadImage } from "@/store/slicers/imageSlicer.js";
import { useNavigate } from "react-router-dom";

import * as styled from "./feedStyles.js";

export const Feed = ({ modalMessage, modalInfo, toastMessage }) => {
  const { posts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  const [deleteId, setDeleteId] = useState(null);

  const [page, setPage] = useState(1);
  const [postText, setPostText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [hashtags, setHashtags] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts(page));
    }
  });

  useEffect(() => {
    if (modalInfo.response !== null) {
      switch (modalInfo.event) {
        case "deletePost":
          if (modalInfo.response) handleDeletePostFinal();
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

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const addHashtag = () => {
    if (hashtags.length >= 3) {
      setHashtags([]);
    } else {
      setHashtags([...hashtags, ""]);
    }
  };

  const handleCreatePost = (e) => {
    e.preventDefault();

    let valid = true;
    if (postText.length === 0) return;
    if (hashtags.length > 0) {
      hashtags.forEach((hashtag) => {
        if (hashtag.length === 0) {
          valid = false;
        }
      });
    }
    if (!valid) return;

    const newPost = {
      text: postText,
      hashtags,
    };

    if (imageFile !== null) {
      dispatch(uploadImage(imageFile)).then((result) => {
        console.log(result);
        if (!result.meta.rejectedWithValue) {
          newPost.imageUrl = result.payload.url;
          dispatch(createPost(newPost)).then((result) => {
            if (!result.meta.rejectedWithValue) {
              setPage(1);
              dispatch(fetchPosts(1));
              toastMessage({
                danger: false,
                title: "Sucesso",
                message: "Post criado com sucesso",
              });
            } else {
              toastMessage({
                danger: true,
                title: "Erro",
                message: "Erro ao criar post",
              });
            }
          });
        }
      });
    } else {
      dispatch(createPost(newPost)).then((result) => {
        if (!result.meta.rejectedWithValue) {
          setPage(1);
          dispatch(fetchPosts(1));
          toastMessage({
            danger: false,
            title: "Sucesso",
            message: "Post criado com sucesso",
          });
        } else {
          toastMessage({
            danger: true,
            title: "Erro",
            message: "Erro ao criar post",
          });
        }
      });
    }

    setPostText("");
    setImageFile(null);
    setHashtags([]);
  };

  const handleDeletePost = (postId, isYours) => {
    console.log(postId, isYours);
    if (!isYours) return;

    setDeleteId(postId);
    modalMessage({
      response: null,
      event: "deletePost",
      title: "Confirmação",
      message: `Deseja excluir o post?`,
    });
  };

  const handleLikePost = (postId, isLiked) => {
    if (isLiked) return;
    const newPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            likes: [...(post.likes ?? []), user.id],
          }
        : post
    );

    dispatch(updatePosts(newPosts));
    dispatch(likePost(postId));
  };

  const handleDislikePost = (postId, isLiked) => {
    if (!isLiked) return;
    const newPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            likes: post.likes.filter((id) => id !== user.id),
          }
        : post
    );

    dispatch(updatePosts(newPosts));
    dispatch(dislikePost(postId));
  };

  const handleSharePost = (postId) => {};

  const handleOpenPost = (postId) => {
    navigate(`/post/:${postId}`);
  };

  const handleDeletePostFinal = () => {
    const newPosts = posts.filter((post) => post.id !== deleteId);

    dispatch(updatePosts(newPosts));
    dispatch(deletePost(deleteId));
  };

  return (
    <styled.Main>
      <styled.Container $height={window.innerHeight}>
        <styled.avatarInputBox>
          <styled.Avatar src={user.profilePictureUrl} />
          <styled.PostMessageBox onSubmit={(e) => handleCreatePost(e)}>
            <styled.createPostContent>
              <styled.PostMessageInput
                placeholder="Compartilhar pensamento..."
                value={postText}
                onChange={(e) => {
                  setPostText(e.target.value.slice(0, 200));
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                maxLength={200}
              />
              {imageFile && (
                <styled.imageButtonDiv>
                  <styled.createPostImage
                    src={URL.createObjectURL(imageFile)}
                  />
                  <styled.closeImageButton onClick={() => setImageFile(null)}>
                    <styled.Icon
                      className="icon-x"
                      style={{ fontSize: "12px", color: "white" }}
                    />
                  </styled.closeImageButton>
                </styled.imageButtonDiv>
              )}

              {hashtags && (
                <styled.HashtagsDiv>
                  {hashtags.map((hashtag, index) => (
                    <styled.createHashtag key={index}>
                      <styled.Icon className="icon-hashtag" />
                      <styled.createHashtagInput
                        value={hashtag}
                        onChange={(e) => {
                          const newHashtags = [...hashtags];
                          newHashtags[index] = e.target.value;
                          setHashtags(newHashtags);
                        }}
                        maxLength={20}
                      />
                    </styled.createHashtag>
                  ))}
                </styled.HashtagsDiv>
              )}
              {postText.length > 0 && (
                <styled.sendButton type="submit">Publicar</styled.sendButton>
              )}
            </styled.createPostContent>
            <styled.PostIconsDiv>
              <label>
                <styled.Icon className="icon-fotos" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  style={{ display: "none" }}
                />
              </label>

              {/* <styled.Icon className="icon-link" />
              <styled.Icon className="icon-vote" /> */}
              <styled.Icon
                className="icon-hashtag"
                onClick={() => addHashtag()}
              />
            </styled.PostIconsDiv>
          </styled.PostMessageBox>
        </styled.avatarInputBox>
        <styled.ListBox>
          {posts.map((post, index) => {
            const isLiked = post.likes ? post.likes.includes(user.id) : false;
            const isYours = post?.ownerId === user.id;

            return (
              <styled.PostContainer key={index} onClick={() => handleOpenPost(post.id)}>
                <styled.PostHeader>
                  <styled.PostAvatar src={post.avatarUrl} />
                  <styled.UserInfo>
                    <styled.UserName>{post.name}</styled.UserName>
                    <styled.UserRole>{post.role}</styled.UserRole>
                  </styled.UserInfo>
                  <styled.Spacer />
                  {isYours && (
                    <styled.MoreOptions
                      className="icon-trash"
                      onClick={() => handleDeletePost(post.id, isYours)}
                    />
                  )}
                </styled.PostHeader>

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

                  <styled.Interactions>
                    <styled.IconText>
                      {isLiked ? (
                        <styled.Icon
                          className="icon-like"
                          onClick={() => handleDislikePost(post.id, isLiked)}
                        />
                      ) : (
                        <styled.Icon
                          className="icon-like-outline"
                          onClick={() => handleLikePost(post.id, isLiked)}
                        />
                      )}
                      {post.likes ? post.likes.length : 0}
                    </styled.IconText>
                    <styled.IconText>
                      <styled.Icon
                        className="icon-comments"
                        onClick={() => handleOpenPost(post.id)}
                      />
                      {post.comments.length}
                    </styled.IconText>
                    <styled.IconText>
                      <styled.Icon
                        className="icon-share"
                        onClick={() => handleSharePost(post.id)}
                      />
                    </styled.IconText>
                  </styled.Interactions>
                </styled.PostFooter>
              </styled.PostContainer>
            );
          })}
        </styled.ListBox>
      </styled.Container>
    </styled.Main>
  );
};
