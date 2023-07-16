import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getUser } from "../store/redusers/user/ActionCreater";
import Home from "./Home/Home";
import { auth } from "../firebase-setup/firebase";
function App() {
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser(""));
  }, []);
  return <Home />;
}

export default App;
