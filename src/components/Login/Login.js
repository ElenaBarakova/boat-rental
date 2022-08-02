import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";

export const Login = () => {
  const { authLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const onRegisterClickHandler = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = Object.fromEntries(new FormData(e.target));

    //ERROR HANDLING
    authService
      .login(email, password)
      .then((authData) => {
        authLogin(authData);
        navigate("/");
      })
      .catch(() => {
        navigate("/error");
      });
  };

  return (
    <div className="login-box">
      <h1>Login</h1>
      <form method="POST" onSubmit={onSubmit}>
        <label>Email</label>
        <input type="text" name="email" placeholder="Email.." />
        <label>Password</label>
        <input type="password" name="password" placeholder="Password.." />
        <input type="submit" value={`Login`} />
      </form>
      <p>
        Not have an account?{" "}
        <a href="/register" onClick={onRegisterClickHandler}>
          Register here
        </a>
      </p>
    </div>
  );
};
