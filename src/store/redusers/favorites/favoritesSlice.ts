import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFavorite } from "../../../interfaces/iFavorite";
import {
  addtoFavorites,
  fetchFavorites,
  removeFromFavorites,
} from "./ActionCreater";

interface FavoritesState {
  favorites: IFavorite[] | null;
  loading: boolean;
  error: string;
}
const initialState: FavoritesState = {
  favorites: null,
  loading: false,
  error: "",
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addtoFavorites.fulfilled, (state, action) => {
      state.loading = false;
      state.favorites?.push(action.payload!);
    });
    builder.addCase(removeFromFavorites.fulfilled, (state, action) => {
      state.loading = false;
      console.log(`beforeFilter - ${state.favorites}`);
      state.favorites = state.favorites!.filter((elem) => {
        elem.isFavorite = true;
        return elem.id !== action.payload?.id;
      });
      state.favorites?.forEach((element, index) => {
        element.isFavorite = true;
      });
      console.log(`afterFilter - ${state.favorites}`);
    });
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.loading = false;
      state.favorites = action.payload;
    });
  },
});

export const favoritesReducer = favoritesSlice.reducer;
