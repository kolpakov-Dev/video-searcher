import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./redusers/user/UserSlice";
import { videoListReducer } from "./redusers/videoList/VideoListSlice";
import { favoritesReducer } from "./redusers/favorites/favoritesSlice";

const rootReducer = combineReducers({
  userReducer,
  videoListReducer,
  favoritesReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
