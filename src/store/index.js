import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slicers/authSlicer.js";
import themeReducer from "./slicers/themeSlicer.js";
import userReducer from "./slicers/userSlicer.js";
import postReducer from "./slicers/postSlicer.js";
import birthdayReducer from "./slicers/birthdaysSlicer.js";
import imageReducer from "./slicers/imageSlicer.js";
import missionsReducer from "./slicers/missionsSlicer.js";
import notificationsReducer from "./slicers/notificationsSlicer.js";
import admReducer from "./slicers/admSlicer.js";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    user: userReducer,
    post: postReducer,
    birthdays: birthdayReducer,
    image: imageReducer,
    missions: missionsReducer,
    notifications: notificationsReducer,
    adm: admReducer
  },
});

export default store;
