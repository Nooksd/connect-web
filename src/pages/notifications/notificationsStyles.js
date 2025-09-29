import styled from "styled-components";

export const Main = styled.div`
  width: min-content;
  margin: 35px auto;
  height: 100%;
  display: flex;
  gap: 100px;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  width: 500px;
  position: relative;
  z-index: 1;
  border-radius: 20px;
`;

export const ListBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.grey};
  border-radius: 20px;
  flex-direction: column;
  margin-bottom: 50px;
  justify-content: start;
  display: flex;
  align-items: center;
  overflow-y: hidden;
`;

export const ListTile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-overflow: ellipsis;
  gap: 16px;
  width: 100%;
  white-space: nowrap;
  padding: 20px 50px;
  cursor: pointer;
  background-color: ${(props) =>
    !props.$visualized ? "rgba(0, 0, 0, .05)" : null};
  color: ${(props) => (props.$selected ? props.theme.fonts.color : null)};

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary_2};
    color: ${(props) => props.theme.fonts.color};

    path {
      fill: ${(props) => props.theme.fonts.color};
    }
  }
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

export const avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
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
`;

export const TileSubtitle = styled.div`
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 200px;
  color: ${(props) => props.theme.colors.text_secondary};
`;
