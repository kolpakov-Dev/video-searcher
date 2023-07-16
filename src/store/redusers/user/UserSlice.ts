import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../interfaces/IUser";
import { createUser, getUser, logIn, signOutFunc } from "./ActionCreater";

interface UserState {
  user: IUser | null;
  loading: boolean;
  error: string;
  counter: number;
}
const initialState: UserState = {
  user: null,
  loading: false,
  error: "",
  counter: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.counter += action.payload;
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.counter -= action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.user = action.payload;
    });
    builder.addCase(createUser.pending, (state, action) => {
      console.log("pending event");
      state.loading = true;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(getUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(signOutFunc.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.user = null;
      }
    });
    builder.addCase(signOutFunc.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signOutFunc.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      console.log(action.payload);
    });
    builder.addCase(logIn.pending, (state, action) => {
      console.log("pending event");
      state.loading = true;
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const userReducer = userSlice.reducer;
