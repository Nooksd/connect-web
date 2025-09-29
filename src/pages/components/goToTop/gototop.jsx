import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TopButton = styled.button`
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 40px;
  right: 40px;
  background-color: ${(props) => props.theme.colors.primary_2};
  color: ${(props) => props.theme.fonts.color};
  opacity: 0.6;
  font-size: 20px;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  z-index: 1000;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const GoToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!visible) return null;

  return <TopButton onClick={scrollToTop}>↑</TopButton>;
};

export default GoToTop;
