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
  height: ${(props) => `${props.$height - 220}px`};
  position: relative;
  z-index: 1;
  border-radius: 20px;
`;

export const SearchBox = styled.form`
  width: 100%;
  height: 40px;
  background-color: ${(props) => props.theme.colors.grey};
  padding: 0 15px;
  border-radius: 20px;
  display: flex;
  align-items: center;
`;

export const SearchIcon = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.grey};
  border: none;
  color: ${(props) => props.theme.colors.primary_dark};
  font-size: 16px;
  font-weight: 300;
  outline: none;
`;

export const filterBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
`;

export const fillterText = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

export const ListBox = styled.div`
  width: 100%;
  height: 85%;
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
  gap: 16px;
  width: 100%;
  white-space: nowrap;
  border-radius: 20px;
  padding: 20px 50px;
  cursor: pointer;
  background-color: ${(props) =>
    props.$selected ? "rgba(0, 0, 0, .05)" : null};

  &:hover {
    background-color: ${(props) => "rgba(0, 0, 0, .05)"};
  }
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
