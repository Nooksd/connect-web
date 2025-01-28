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
  margin-top: 80px;
  height: ${(props) => `${props.$height - 300}px`};
  padding-top: 100px;
  position: relative;
  z-index: 1;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.grey};
`;

export const BigAvatar = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
`;

export const icon = styled.span`
  font-size: 28px;
  color: ${(props) => props.theme.colors.primary_2};
`;

export const ListBox = styled.form`
  width: 100%;
  height: 100%;
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

export const TileTitle = styled.h1`
  font-size: 14px;
  font-weight: 500;
`;

export const TileInput = styled.input`
  font-size: 18px;
  font-weight: 500;
  height: 35px;
  padding: 0 10px;
  background-color: transparent;
  border: 2px solid ${(props) => props.theme.colors.primary_2};
  border-radius: 20px;
  color: ${(props) => props.theme.colors.primary_dark};
`;

export const TileButton = styled.button`
  font-size: 18px;
  font-weight: 500;
  width: 150px;
  cursor: pointer;
  height: 35px;
  padding: 0 10px;
  background-color: ${(props) => props.theme.colors.primary_2};
  border-radius: 20px;
  color: ${(props) => props.theme.fonts.color};
`;
