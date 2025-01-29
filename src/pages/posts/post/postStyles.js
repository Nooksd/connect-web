import styled from "styled-components";

export const Main = styled.div`
  width: min-content;
  margin: 35px auto;
  padding-top: 80px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 9px;
`;

export const Container = styled.div`
  width: 700px;
  height: auto;
  z-index: 1;
  border-radius: 20px;
  position: relative;
  background-color: ${(props) => props.theme.colors.grey};
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  padding: 100px 20px 20px 20px;
`;

export const bigAvatar = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  margin-left: ${(props) => (props.$index > 0 ? "-80px" : 0)};
  z-index: ${(props) => -props.$index};
  object-fit: cover;
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
`;

export const UserInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  align-items: center;
  justify-content: center;
`;

export const UserName = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary_dark};
`;

export const UserRole = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.colors.secondary_dark};
  font-style: italic;
`;

export const PostContent = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PostText = styled.p`
  max-width: 80%;
  font-size: 14px;
  position: relative;
  color: ${(props) => props.theme.colors.primary_dark};
  line-height: 1.5;
  text-align: start;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

export const quotes1 = styled.span`
  position: absolute;
  top: 0;
  left: -30px;
  transform: rotateX(180deg);
  transform: rotateY(180deg);
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary_2};
`;

export const quotes2 = styled.span`
  position: absolute;
  bottom: 0;
  right: -30px;
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary_2};
`;

export const PostImageBox = styled.div`
  width: 100%;
  max-height: 400px;
  display: flex;
  overflow: hidden;
  margin-top: 20px;
  justify-content: start;
  align-items: start;
`;

export const PostImage = styled.img`
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
`;

export const PostFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
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

export const PostTime = styled.span`
  width: 100%;
  align-self: flex-end;
  text-align: end;
  margin-top: 15px;
  font-size: 12px;
  color: ${(props) => props.theme.colors.primary_2};
`;

export const Separator = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${(props) => props.theme.colors.grey};
`;

export const ListTile = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.grey};
  border-radius: 20px;
  text-overflow: ellipsis;
  gap: 16px;
  width: 100%;
  padding: 20px 6px;
`;

export const TileLeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary_light};
`;

export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

export const TileContent = styled.div`
  flex: 1;
  width: 100%;
  gap: 4px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TileTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

export const TileSubtitle = styled.div`
  font-size: 14px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  white-space: pre-wrap;
  max-width: 600px;
  text-align: start;
  color: ${(props) => props.theme.colors.text_secondary};
`;


export const CommentInput = styled.input`
  width: 100%;
  height: 40px; 
  background-color: ${(props) => props.theme.colors.grey};
  border-bottom: 1px solid ${(props) => props.theme.colors.primary_2};
  padding: 0 15px;
  color: ${(props) => props.theme.colors.primary_dark};
  font-size: 14px;
  font-weight: 300;
  outline: none;
`;

export const CommentButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background-color: transparent;
  color: ${(props) => props.theme.colors.primary_2};
  font-size: 17px;
  cursor: pointer;
`;

export const CommentDelete = styled.span`
  font-size: 18px;
  color: ${(props) => props.theme.colors.danger};
  cursor: pointer;
`;