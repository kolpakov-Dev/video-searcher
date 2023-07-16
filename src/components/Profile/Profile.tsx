import { useState } from "react";
import "./profile.css";
import RegForm from "./regForm";
import AuthForm from "./authForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { signOutFunc } from "../../store/redusers/user/ActionCreater";
function Profile() {
  const { user } = useAppSelector((state) => state.userReducer);
  const [regAuthFlag, changeRegAuthFlag] = useState(false);
  const [errorMessage] = useState("");
  const [regUserData, setRegUserData] = useState(() => {
    return {
      email: "",
      name: "",
      password: "",
    };
  });
  const dispatch = useAppDispatch();
  return (
    <div className="profile">
      <h2>Profile</h2>
      <div className="profileContent">
        {!user ? (
          <div className="authentication">
            <p
              className={
                errorMessage.length
                  ? "errorMessage errorMessageActive"
                  : "errorMessage"
              }
            >
              {errorMessage}
            </p>
            {regAuthFlag ? (
              <RegForm
                func={changeRegAuthFlag}
                changeUser={setRegUserData}
                authUserData={regUserData}
              />
            ) : (
              <AuthForm
                func={changeRegAuthFlag}
                changeUser={setRegUserData}
                authUserData={regUserData}
              />
            )}
          </div>
        ) : (
          <div className="userProfile">
            <p>Hello, {user?.name}</p>
            <p>Email: {user?.email}</p>

            <span>Now you can use Favorites page</span>
            <div
              className="profileSignOut"
              onClick={() => {
                dispatch(signOutFunc(""));
              }}
            >
              sign out
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Profile;
