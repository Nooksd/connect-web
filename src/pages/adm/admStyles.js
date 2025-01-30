import styled from "styled-components";

export const contentDiv = styled.div`
  width: 100%;
  height: calc(${(props) => props.$windowHeight}px - 220px);
  padding: 15px 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const content = styled.div`
  width: 700px;
  height: calc(100% - 120px);
  display: flex;
  gap: 20px;
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

export const optionsBlockDiv = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
`;

export const optionsTitleDiv = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  margin-top: 20px;
  padding: 0 30px;
  align-items: center;
  justify-content: start;
  background-color: ${(props) => props.theme.fonts.color};
  border-top: 3px solid ${(props) => props.theme.colors.primary_dark};
  color: ${(props) => props.theme.colors.primary_dark};
  font-size: 22px;
  font-weight: 700;
`;

export const optionButton = styled.button`
  width: 100%;
  height: 50px;
  display: flex;
  padding: 0 30px;
  align-items: center;
  justify-content: start;
  background-color: ${(props) => props.theme.fonts.color};
  border-top: 3px solid ${(props) => props.theme.colors.grey};
  font-size: 16px;
  cursor: pointer;

  svg {
    fill: ${(props) => props.theme.colors.primary_dark};
    path {
      fill: ${(props) => props.theme.colors.primary_dark};
    }
    ellipse {
      fill: ${(props) => props.theme.colors.primary_dark};
    }
    circle {
      fill: ${(props) => props.theme.colors.primary_dark};
    }
  }

  span {
    margin-left: 15px;
  }

  &:last-child {
    border-bottom: 3px solid ${(props) => props.theme.colors.grey};
  }
  &:hover {
    span {
      margin-left: 25px;
      transition: margin 0.2s;
    }
    background-color: ${(props) => "rgba(0, 0, 0, .05)"};
  }
`;

export const Icon = styled.div`
  font-size: 20px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.primary_2};
`;

export const pageTrailDiv = styled.div`
  width: 100%;
  height: 40px;
  font-size: 20px;
  color: ${(props) => props.theme.colors.primary_dark};
  font-style: italic;
  font-weight: 600;
  display: flex;
  align-items: flex-start;
  gap: 15px;
  justify-content: flex-start;
  opacity: 0.9;

  span {
    display: flex;
    gap: 15px;
    align-items: center;

    span {
      cursor: pointer;
    }
  }

  svg {
    g {
      fill: ${(props) => props.theme.colors.primary_dark};
    }
  }
`;

export const pageContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 3px solid ${(props) => props.theme.colors.grey};
`;
