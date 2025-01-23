import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slicers/userSlicer.js";
import themeReducer from "./slicers/themeSlicer.js";
import contactsSlicer from "./slicers/contactsSlicer.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    contacts: contactsSlicer,
  },
});

export default store;
