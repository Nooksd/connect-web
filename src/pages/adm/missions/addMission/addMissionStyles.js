import styled from "styled-components";

export const formTitle = styled.h1`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.primary_dark};
`;

export const formContainer = styled.div`
  width: 1000px;
  height: 80%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 20px 0;
  gap: 50px;
  align-content: flex-start;
  justify-content: center;
  margin: 0 auto;
  border-top: 3px solid ${(props) => props.theme.colors.primary_dark};
  border-bottom: 1px solid ${(props) => props.theme.colors.primary_dark};
  background-color: ${(props) => props.theme.fonts.color};
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

export const formDiv = styled.div`
  width: 80%;
  position: relative;

  &:before {
    ${(props) => props.$required && "content: '*';"}
    width: 10px;
    height: 10px;
    position: absolute;
    top: 50%;
    left: -20px;
    font-size: 22px;
    color: ${(props) => props.theme.colors.danger};
  }
`;

export const formInput = styled.input`
  width: 100%;
  min-height: 40px;
  padding: 10px;
  border: 1px solid
    ${(props) =>
      props.$error
        ? props.theme.colors.danger
        : props.theme.colors.primary_dark};
  border-radius: 5px;
  color: ${(props) => props.theme.colors.primary_dark};
  font-size: 18px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const formArea = styled.textarea`
  width: 100%;
  min-height: 40px;
  padding: 10px;
  border: 1px solid
    ${(props) =>
      props.$error
        ? props.theme.colors.danger
        : props.theme.colors.primary_dark};
  border-radius: 5px;
  color: ${(props) => props.theme.colors.primary_dark};
  font-size: 18px;
  outline: none;
  resize: none;
  overflow-y: hidden;
`;


export const formLabel = styled.label`
  width: 80%;
  min-height: 40px;
  padding: 10px;
  color: ${(props) => props.theme.colors.primary_dark};
  font-size: 18px;
  white-space: nowrap;
`;

export const formManagerAndSubmitButtonDiv = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: end;
`;

export const formSubmitButton = styled.button`
  width: 200px;
  min-height: 40px;
  border: none;
  align-self: flex-end;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.secondary_2};
  color: ${(props) => props.theme.fonts.color};
  font-size: 18px;

  svg {
    path {
      fill: ${(props) => props.theme.fonts.color};
    }
  }
`;

export const formSelect = styled.select`
  width: 100%;
  min-height: 40px;
  padding: 10px;
  border: 1px solid
    ${(props) =>
      props.$error
        ? props.theme.colors.danger
        : props.theme.colors.primary_dark};
  border-radius: 5px;
  color: ${(props) => props.theme.colors.primary_dark};
  font-size: 18px;
  background-color: ${(props) => props.theme.fonts.color};
`;
