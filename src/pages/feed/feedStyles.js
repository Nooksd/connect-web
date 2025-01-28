import styled from "styled-components";

export const Main = styled.div`
  width: min-content;
  margin: 35px auto;
  height: 100%;
  display: flex;
  gap: 50px;
  align-items: start;
`;

export const Container = styled.div`
  width: 700px;
  height: ${(props) => `${props.$height - 220}px`};
  z-index: 1;
  border-radius: 20px;
`;

export const avatarInputBox = styled.div`
  width: 100%;
  margin-bottom: 40px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

export const Avatar = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  object-fit: cover;
`;

export const PostMessageBox = styled.form`
  width: 100%;
  min-height: 60px;
  padding: 0 15px;
  border-radius: 100px;
  background-color: ${(props) => props.theme.colors.grey};
  display: flex;
  gap: 15px;
  align-items: center;
  padding: 0 35px;
  position: relative;
`;

export const PostIconsDiv = styled.div`
  width: min-content;
  height: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled.span`
  font-size: 20px;
  color: ${(props) => props.theme.colors.primary_2};
`;

export const PostMessageInput = styled.textarea`
  width: 100%;
  height: min-content;
  max-height: 100px;
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.colors.primary_dark};
  font-size: 14px;
  font-weight: 300;
  outline: none;
  resize: none;
  padding: 15px 0;
  overflow-y: hidden;
`;

export const ListBox = styled.div`
  width: calc(100% - 30px);
  height: 80%;
  margin-left: 30px;
  border-radius: 20px;
  flex-direction: column;
  justify-content: start;
  display: flex;
  align-items: center;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.primary_2};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.secondary_2};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.secondary_1};
  }
`;

export const PostContainer = styled.div`
  width: 98%;
  border-radius: 20px;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.grey};
  margin-bottom: 20px;
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`;

export const PostAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

export const UserName = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary_dark};
`;

export const UserRole = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.colors.secondary_dark};
  font-style: italic;
`;

export const MoreOptions = styled.span`
  font-size: 18px;
  color: ${(props) => props.theme.colors.secondary_dark};
  cursor: pointer;
`;

export const PostContent = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PostText = styled.p`
  width: 75%;
  height: 100px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.primary_dark};
  line-height: 1.5;
  text-align: center;
  white-space: pre-line;
`;

export const PostImageBox = styled.div`
  width: 100%;
  max-height: 400px;
  display: flex;
  overflow: hidden;
  margin-top: 15px;
  justify-content: start;
  align-items: start;
`;

export const PostImage = styled.img`
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
`;

export const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Hashtags = styled.div`
  display: flex;
  gap: 10px;
`;

export const Hashtag = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.colors.primary_2};
`;

export const Interactions = styled.div`
  display: flex;
  gap: 25px;
`;

export const IconText = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  font-size: 14px;
  color: ${(props) => props.theme.colors.primary_dark};
`;
