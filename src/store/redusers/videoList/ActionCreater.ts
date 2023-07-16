import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchVideo } from "../../../models/VideoList";

export const fetchVideoList = createAsyncThunk(
  "user/fetchVideoList",
  async (_: any, thunkApi) => {
    return fetchVideo(_.search, _.count);
  }
);
