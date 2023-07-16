import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { IUser } from "../interfaces/IUser";
import { auth } from "../firebase-setup/firebase";
export const createUserFunc = async (
  name: string,
  email: string,
  password: string
) => {
  if (name !== "" && email !== "" && password !== "") {
    try {
      const createUserEvent = createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then((userCredential) => {
        return userCredential.user;
      });
      const currUser = await createUserEvent;
      const updateUserName = updateProfile(currUser, {
        displayName: name,
      }).then(() => {
        return {
          name: currUser.displayName,
          email: currUser.email,
          id: currUser.uid,
        } as IUser;
      });
      return updateUserName;
    } catch (e: any) {
      console.log(`Create user Error:${e.message}`);
      return null;
    }
  }
};
export const loginFunc = async (email: string, password: string) => {
  try {
    const logInPromise = signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const newUser = userCredential.user;
        if (newUser) {
          return {
            name: newUser.displayName,
            email: newUser.email,
            id: newUser.uid,
          } as IUser;
        }
        return null;
      }
    );
    return logInPromise;
  } catch (e: any) {
    console.log(`SignIn Error:${e.message}`);
    return null;
  }
};
