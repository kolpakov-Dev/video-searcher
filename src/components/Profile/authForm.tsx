import { useState } from "react";
import { BiShow, BiSolidShow } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { IRegAuthForm } from "../../interfaces/components";
import { IRegData } from "../../interfaces/IRegData";
import { useAppDispatch } from "../../hooks/redux";
import { logIn } from "../../store/redusers/user/ActionCreater";
const AuthForm = ({ func, changeUser, authUserData }: IRegAuthForm) => {
  const [showPass, setShowPass] = useState(false);
  const [passType, changePassType] = useState("password");
  const dispatch = useAppDispatch();
  const auth = () => {
    if (authUserData.email !== "" && authUserData.password !== "") {
      dispatch(logIn(authUserData));
    }
  };
  const EventShowPass = () => {
    setShowPass(!showPass);
    showPass ? changePassType("text") : changePassType("password");
  };
  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = { email: event.target.value };
    changeUser((authUserData: IRegData) => ({
      ...authUserData,
      ...newEmail,
    }));
  };
  const onPassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPass = { password: event.target.value };
    changeUser((authUserData: IRegData) => ({
      ...authUserData,
      ...newPass,
    }));
  };
  return (
    <div className="auth">
      <h3>Log in:</h3>
      <div className="inputItem regInputItem">
        <input
          type="email"
          placeholder="Email"
          value={authUserData.email}
          onChange={onEmailChange}
        />
        <MdEmail />
      </div>
      <div className="inputItem passwordItem">
        <input
          type={passType}
          placeholder="Password"
          value={authUserData.password}
          onChange={onPassChange}
        />
        {!showPass ? (
          <BiShow onClick={EventShowPass} />
        ) : (
          <BiSolidShow onClick={EventShowPass} />
        )}
      </div>

      <div className="regAuthBtn" onClick={() => auth()}>
        Log in
      </div>
      <span
        className="changeRegAuth"
        onClick={() => {
          func(true);
          changeUser({ password: "", name: "", email: "" });
        }}
      >
        Don't have an account? Sign up.
      </span>
    </div>
  );
};
export default AuthForm;
