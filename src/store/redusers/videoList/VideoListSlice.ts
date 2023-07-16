import { createSlice } from "@reduxjs/toolkit";
import { IVideo } from "../../../interfaces/IVideo";
import { fetchVideoList } from "./ActionCreater";

interface VideoState {
  videoList: IVideo[] | null;
  loading: boolean;
  error: string;
}
const initialState: VideoState = {
  videoList: null,
  loading: false,
  error: "",
};

export const VideoListSlice = createSlice({
  name: "videoList",
  initialState,
  reducers: {
    updateVideo: (state, action) => {
      state.videoList?.forEach((elem) => {
        if (elem.id === action.payload.id) elem.isFavorite = !elem.isFavorite;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVideoList.fulfilled, (state, action) => {
      state.loading = false;
      state.videoList = action.payload as IVideo[] | null;
    });
    builder.addCase(fetchVideoList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchVideoList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const videoListReducer = VideoListSlice.reducer;
