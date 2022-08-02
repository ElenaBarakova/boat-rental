import "./Register.css";

import * as authService from "../../services/authService";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const Register = () => {
  const { authLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    if (password !== confirmPassword) {
      console.log("error");
      return;
    }

    authService.register(username, email, password).then((authData) => {
      authLogin(authData);
      navigate("/");
    });
  };
  return (
    <div className="register-box">
      <h1>Register</h1>
      <h4>It's free and only take a minute</h4>
      <form method="POST" onSubmit={onSubmit}>
        <label>Username</label>
        <input type="text" name="username" placeholder="Username.." />
        <label>Email</label>
        <input type="text" name="email" placeholder="Email.." />
        <label>Password</label>
        <input type="password" name="password" placeholder="Password.." />
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirm-password"
          placeholder="Confirm Password.."
        />
        <input type="submit" value="Register" />
      </form>
      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};
