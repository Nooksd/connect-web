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
  height: ${(props) => `${props.$height - 220}px`};
  position: relative;
  z-index: 1;
  border-radius: 20px;
`;

export const icon = styled.span`
  font-size: 28px;
  color: ${(props) => props.theme.colors.primary_2};
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

export const ListTile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-overflow: ellipsis;
  gap: 16px;
  width: 100%;
  border-radius: 20px;
  white-space: nowrap;
  padding: 20px 50px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => "rgba(0, 0, 0, .05)"};
  }

  &:last-child {
    background-color: ${(props) => props.theme.colors.dangerBackColor};
    color: ${(props) => props.theme.colors.danger};

    span {
      color: ${(props) => props.theme.colors.danger};
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

export const TileContent = styled.div`
  flex: 1;
  width: min-content;
  gap: 4px;
  display: flex;
  flex-direction: column;
`;

export const TileTitle = styled.h1`
  font-size: 18px;
  font-weight: 500;
`;
