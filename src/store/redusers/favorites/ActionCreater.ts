import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} from "@firebase/firestore";
import { auth, firestore } from "../../../firebase-setup/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IFavorite } from "../../../interfaces/iFavorite";
export const addtoFavorites = createAsyncThunk(
  "user/addToFavorites",
  async (_: any, thunkApi) => {
    const currentUser = auth.currentUser;
    const ref = collection(firestore, "favorites"); // Firebase creates this automatically
    let data = {
      id: _.id,
      thumb: _.thumb,
      width: _.width,
      height: _.height,
      title: _.title,
      userID: currentUser?.uid,
    };
    try {
      addDoc(ref, data);
      return {
        id: _.id,
        thumb: _.thumb,
        width: _.width,
        height: _.height,
        title: _.title,
        isFavorite: true,
      } as IFavorite;
    } catch (err: any) {
      console.log(err.message);
      return null;
    }
  }
);
export const removeFromFavorites = createAsyncThunk(
  "user/removeFromFavorites",
  async (_: any, thunkApi) => {
    const currentUser = auth.currentUser;
    try {
      const q = query(
        collection(firestore, "favorites"),
        where("id", "==", _.id),
        where("userID", "==", currentUser!.uid)
      );

      const querySnapshot = await getDocs(q);
      const docID = querySnapshot.docs[0].id;
      await deleteDoc(doc(firestore, "favorites", docID));
      return { ..._, favorite: true };
    } catch (err: any) {
      console.log(err.message);
      return null;
    }
  }
);
export const fetchFavorites = createAsyncThunk(
  "user/fetchFavorites",
  async (_: any, thunkApi) => {
    let resArr: IFavorite[];
    const currentUser = auth.currentUser;
    try {
      const q = query(
        collection(firestore, "favorites"),
        where("userID", "==", currentUser?.uid)
      );
      const ref = await getDocs(q);
      resArr = ref.docs.map((element) => {
        return { ...element.data(), isFavorite: true };
      });
      return resArr;
    } catch (err: any) {
      console.log(err.message);
      return null;
    }
  }
);
