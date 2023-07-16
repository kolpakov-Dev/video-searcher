import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../../firebase-setup/firebase";
import { IUser } from "../../../interfaces/IUser";
import { createUserFunc, loginFunc } from "../../../models/User";
import { signOut } from "firebase/auth";
function userGet(): Promise<IUser | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (auth.currentUser) {
        resolve({
          name: auth.currentUser?.displayName,
          email: auth.currentUser?.email,
          id: auth.currentUser?.uid,
          password: "",
        } as IUser);
      } else {
        return null;
      }
    }, 1000);
  });
}
export const getUser = createAsyncThunk(
  "user/getUser",
  async (_: any, thunkApi) => {
    return await userGet();
  }
);
export const signOutFunc = createAsyncThunk(
  "user/signOut",
  async (_: any, thunkApi) => {
    try {
      await signOut(auth);
      return true;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
);
export const logIn = createAsyncThunk(
  "user/logIn",
  async (_: any, thunkApi) => {
    try {
      return (await loginFunc(_.email, _.password)) as IUser;
    } catch (e) {
      return null;
    }
  }
);
export const createUser = createAsyncThunk(
  "user/createUser",
  async (_: any, thunkApi) => {
    try {
      return (await createUserFunc(_.name, _.email, _.password)) as IUser;
    } catch (e) {
      return null;
    }
  }
);
