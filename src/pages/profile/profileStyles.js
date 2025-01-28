import styled from "styled-components";

export const Main = styled.div`
  width: min-content;
  margin: ${props => props.$profile ? "35px auto" : 0};
  height: 100%;
  display: flex;
  gap: 100px;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  width: 720px;
  height: ${(props) => `${props.$height - 220}px`};
  position: relative;
  z-index: 1;
  background-color: ${(props) => props.theme.colors.grey};
  border-radius: 20px;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    height: 150px;
    background-color: ${(props) => props.theme.colors.primary_2};
    border-radius: 20px 20px 0 0;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-weight: 500;
  flex-direction: column;
  justify-content: start;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 3;
  color: ${(props) => props.theme.colors.primary_dark};
`;

export const Leading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 75px 0 17px 0;
  background-color: ${(props) => props.theme.colors.primary_light};
  `;

export const Avatar = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
`;

export const Subtitle = styled.span`
  font-size: 16px;
  font-weight: 200;
  font-style: italic;
  color: ${(props) => props.theme.colors.primary_dark};
`;

export const ContactInfo = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  margin-bottom: 50px;
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

export const userInfoColumns = styled.div`
  margin-top: 30px;
  width: min-content;
  height: min-content;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  gap: 40px;
`;

export const title = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

export const ListTile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-overflow: ellipsis;
  gap: 16px;
  width: 100%;
  white-space: nowrap;
  border-radius: 8px;
`;

export const TileLeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 48px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary_light};
`;

export const TileContent = styled.div`
  flex: 1;
  width: min-content;
  gap: 4px;
  display: flex;
  flex-direction: column;
`;

export const TileTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text};
`;

export const TileSubtitle = styled.div`
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 200px;
  color: ${(props) => props.theme.colors.text_secondary};
`;
