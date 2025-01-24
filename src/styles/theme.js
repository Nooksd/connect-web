// theme.js

const generalColors = {
  primary_dark: "#172242",
  primary_1: "#2E4483",
  primary_2: "#2257A8",
  secondary_1: "#95C11F",
  secondary_2: "#B0D159",
  grey: "#f6f8fd",

  danger: "#cc3333",
  dangerText: "#87141f",
  dangerBackColor: "#f8d0c8",
  alert: "#ffab00",
  success: "#36b37e",
  information: "#0065ff",
  help: "#6554c0",
  neutral: "#ebecf0",
};
const fonts = {
  main: "Arial, sans-serif",
  color: "#fff",
};

export const lightTheme = {
  colors: {
    ...generalColors,
    background: "#fff",
    text: "#172242",
  },
  fonts: fonts,
};
export const darkTheme = {
  colors: {
    ...generalColors,
    background: "#2F2E41",
    text: "#fff",
  },
  fonts: fonts,
};
