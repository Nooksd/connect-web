import styled, { keyframes } from "styled-components";

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
    to {
    transform: rotate(360deg);
  }
    `;

export const NavBar = styled.nav`
  height: 150px;
  z-index: 9999;
  background: ${(props) => props.theme.colors.primary_2};
`;

export const NavBar1 = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 70px;
`;

export const NavBar2 = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NavItem1 = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: start;
`;

export const NavItem2 = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: end;
  align-items: center;
`;

export const NavTitle = styled.h1`
  color: ${(props) => props.theme.fonts.color};
  font-size: 26px;
  font-weight: 700;
  margin-left: 15px;
`;

export const Division = styled.nav`
  width: 1px;
  height: 100%;
  margin: 0 15px;
  background-color: ${(props) => props.theme.fonts.color};
`;

export const RoundButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  background-color: ${(props) => props.theme.fonts.color};
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    animation: ${rotateAnimation} 0.5s linear;
  }
`;

export const ProfilePicture = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  overflow: hidden;
`;

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
`;

export const Name = styled.h2`
  font-size: 16px;
  white-space: nowrap;
  margin-left: 15px;
  font-weight: 500;
  min-width: 200px;
  min-height: 20px;
  overflow: hidden;
  color: ${(props) => props.theme.fonts.color};
`;

export const openMenu = styled.div`
  position: relative;
  cursor: pointer;
`;

export const Menu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  width: auto;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
  transition: display 0.3s ease;
  flex-direction: column;
  overflow: hidden;
  display: ${(props) => (props.$show ? "flex" : "none")};
`;

export const MenuItem = styled.div`
  padding: 10px;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 7px;
  color: ${(props) => props.theme.colors.primary_dark};
  border-bottom: 1px solid ${(props) => props.theme.colors.primary_dark};

  &:hover {
    background-color: #f5f5f5;
  }
  &:last-child {
    border-bottom: none;
  }
`;

export const InnovaCoin = styled.div`
  height: 100%;
  align-items: center;
  margin-left: 15px;
  display: flex;
  gap: 5px;
  color: ${(props) => props.theme.fonts.color};
  font-size: 14px;
  font-weight: 700;
`;

export const pageButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
  width: 130px;
  height: 70px;
  cursor: pointer;
  color: ${(props) => props.theme.fonts.color};
  background: ${(props) => props.$selected ? "linear-gradient(360deg, #2E4483 0%, rgba(0,0,0,0) 100%)" : null};
  font-size: 14px;
  font-weight: 700;
`;
