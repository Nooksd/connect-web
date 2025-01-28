import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "@/store/slicers/postSlicer.js";

import * as styled from "./feedStyles.js";

export const Feed = ({ windowHeight }) => {
  const { posts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  const [page, setPage] = useState(1);
  const [postMessage, setPostMessage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts(page));
    }
  });

  return (
    <styled.Main>
      <styled.Container $height={window.innerHeight}>
        <styled.avatarInputBox>
          <styled.Avatar src={user.profilePictureUrl} />
          <styled.PostMessageBox onSubmit={(e) => console.log(e)}>
            <styled.PostMessageInput
              placeholder="Compartilhar pensamento..."
              value={postMessage}
              onChange={(e) => {
                setPostMessage(e.target.value.slice(0, 200));
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              maxLength={200}
            />
            <styled.PostIconsDiv>
              <styled.Icon className="icon-fotos" />
              {/* <styled.Icon className="icon-link" />
              <styled.Icon className="icon-vote" /> */}
              <styled.Icon className="icon-hashtag" />
            </styled.PostIconsDiv>
          </styled.PostMessageBox>
        </styled.avatarInputBox>
        <styled.ListBox>
          {posts.map((post, index) => {
            console.log(post);
            return (
              <styled.PostContainer key={index}>
                <styled.PostHeader>
                  <styled.PostAvatar src={post.avatarUrl} />
                  <styled.UserInfo>
                    <styled.UserName>{post.name}</styled.UserName>
                    <styled.UserRole>{post.role}</styled.UserRole>
                  </styled.UserInfo>
                  <styled.MoreOptions className="icon-more" />
                </styled.PostHeader>

                <styled.PostContent>
                  {post.text && <styled.PostText>{post.text}</styled.PostText>}
                  {post.imageUrl && (
                    <styled.PostImageBox>
                      <styled.PostImage src={post.imageUrl} />
                    </styled.PostImageBox>
                  )}
                </styled.PostContent>

                <styled.PostFooter>
                  <styled.Hashtags>
                    {post.hashtags.map((tag) => (
                      <styled.Hashtag key={tag}>#{tag}</styled.Hashtag>
                    ))}
                  </styled.Hashtags>
                  <styled.Interactions>
                    <styled.IconText>
                      <styled.Icon className="icon-like" />
                      {post.likes.length}
                    </styled.IconText>
                    <styled.IconText>
                      <styled.Icon className="icon-comments" />
                      {post.comments.length}
                    </styled.IconText>
                    <styled.IconText>
                      <styled.Icon className="icon-share" />
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
