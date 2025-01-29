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
  width: 650px;
  height: auto;
  margin-top: 80px;
  position: relative;
  z-index: 1;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.primary_2};
  color: ${(props) => props.theme.fonts.color};
  align-items: center;
  padding-top: 90px;
  justify-content: start;
  display: flex;
  flex-direction: column;
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

export const congratsButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  bottom: -25px;
  right: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  box-shadow: 2px 2px 0px 1px ${(props) => props.theme.colors.secondary_2};
  cursor: pointer;
  font-size: 22px;
`;

export const avatarContainer = styled.div`
  width: 100%;
  height: 160px;
  position: absolute;
  top: -80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const bigAvatar = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  margin-left: ${(props) => (props.$index > 0 ? "-80px" : 0)};
  z-index: ${(props) => -props.$index};
  object-fit: cover;
`;

export const textWrapper = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
`;

export const Box = styled.div`
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

export const ListWrapper = styled.div`
  margin-top: 30px;
  width: 100%;
  height: min-content;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  justify-items: center;
  gap: 20px;
`;

export const ListTile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-overflow: ellipsis;
  gap: 16px;
  width: 100%;
  white-space: nowrap;
  padding: 6px 50px;
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
  width: 100%;
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

export const ConfettiWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
