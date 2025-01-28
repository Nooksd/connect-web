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
  width: 500px;
  height: 100%;
  position: relative;
  z-index: 1;
  border-radius: 20px;
`;

export const Container2 = styled.div`
  width: 550px;
  height: 250px;
  margin-top: 80px;
  position: relative;
  z-index: 1;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.primary_2};
  color: ${(props) => props.theme.fonts.color};
  display: flex;
`;

export const Content1 = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const Content2 = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const PointsListTile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-overflow: ellipsis;
  gap: 5px;
  white-space: nowrap;
`;

export const PointsTileLeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;

  path {
    fill: ${(props) => props.theme.fonts.color};
  }
`;

export const PointsTileTitle = styled.div`
  font-size: 13px;
  font-weight: 200;
`;

export const PointsTileSubtitle = styled.div`
  font-size: 32px;
  font-weight: bold;
  max-width: 200px;
`;


export const userData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 20px;
    font-weight: 500;
  }
  h4 {
    font-size: 14px;
    font-weight: 100;
  }
`;

export const SectionTitle = styled.h1`
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 20px;
`;

export const Section = styled.div`
  width: min-content;
  height: ${(props) => `${props.$height - 265}px`};
`;

export const bigAvatar = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  top: -80px;
  left: 25%;
  transform: translateX(-25%);
`;

export const Box = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.grey};
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

export const ListWrapper = styled.div`
  width: 100%;
  height: min-content;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  justify-items: center;
`;

export const ListTile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-overflow: ellipsis;
  gap: 25px;
  width: 100%;
  border-radius: 20px;
  white-space: nowrap;
  padding: 20px 50px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => "rgba(0, 0, 0, .05)"};
  }
`;

export const TileLeading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary_light};
  font-size: 14px;
`;

export const TileContent = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const TileTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

export const TileSubtitle = styled.div`
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 200px;
  color: ${(props) => props.theme.colors.text_secondary};
  display: flex;
  gap: 2px;
`;
