import styled from "styled-components";

export const Main = styled.div`
  width: min-content;
  margin: 35px auto;
  padding-top: 80px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 80px;
  overflow: auto;

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

export const headerUsersDiv = styled.div`
  width: 100%;
  min-height: 45px;
  display: flex;
  align-items: center;
  padding-left: 55px;
  justify-content: flex-start;
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary_dark};
  border-bottom: 3px solid ${(props) => props.theme.colors.grey};
`;

export const Container = styled.div`
  width: 500px;
  height: auto;
  z-index: 1;
  border-radius: 20px;
  position: relative;
  background-color: ${(props) => props.theme.colors.grey};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 70px 20px 20px 20px;
`;

export const bigAvatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-left: ${(props) => (props.$index > 0 ? "-80px" : 0)};
  z-index: ${(props) => -props.$index};
  object-fit: cover;
  position: absolute;
  top: -60px;
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

export const PostFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  align-items: center;
`;

export const PostTime = styled.span`
  width: 100%;
  align-self: flex-end;
  text-align: end;
  margin-top: 15px;
  font-size: 12px;
  color: ${(props) => props.theme.colors.primary_2};
`;

export const ButtonBox = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const DeclineButton = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 20px;
  border: none;
  color: ${(props) => props.theme.colors.danger};
  background-color: ${(props) => props.theme.colors.dangerBackColor};
  cursor: pointer;
`;

export const AcceptButton = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 20px;
  border: none;
  color: ${(props) => props.theme.fonts.color};
  background-color: ${(props) => props.theme.colors.primary_2};
  cursor: pointer;
`;