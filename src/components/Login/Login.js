import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";

export const Login = () => {
  const [errorMessage, setErrorMessage] = useState(null);
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
    authService.login(email, password).then((authResponse) => {
      if (
        authResponse.code >= 400 &&
        authResponse.code <= 500 &&
        authResponse?.message
      ) {
        setErrorMessage(authResponse.message);
      } else {
        authLogin(authResponse);
        navigate("/");
      }
    });
  };

  return (
    <div className="login-box">
      <h1>Login</h1>
      {errorMessage && (
        <div class="alert alert-danger text-center" role="alert">
          {errorMessage}
        </div>
      )}
      <form method="POST" onSubmit={onSubmit}>
        <label>Email</label>
        <input type="text" name="email" placeholder="Email.." />
        <label>Password</label>
        <input type="password" name="password" placeholder="Password.." />
        <input type="submit" value="LOGIN" className="btn-hover" />
      </form>
      <p>
        Not have an account?
        <a href="/register" onClick={onRegisterClickHandler}>
          Register here
        </a>
      </p>
    </div>
  );
};
