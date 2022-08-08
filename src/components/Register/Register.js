import "./Register.css";

import * as authService from "../../services/authService";
import { useNavigate } from "react-router-dom";

import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import {
  checkEmail,
  checkMaxLength,
  checkMinLength,
} from "../../services/validationService";
import { formFields } from "../../constants/constants";

export const Register = () => {
  const { authLogin } = useContext(AuthContext);
  const [validationErrors, setValidationErrors] = useState({});
  const formRef = useRef();
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

  const addToValidationErrors = (key, value) => {
    setValidationErrors((currentErrors) => ({
      ...currentErrors,
      [key]: value,
    }));
  };

  const removeValidationErrors = (key, value) => {
    setValidationErrors((currentErrors) => {
      const { [key]: value, ...rest } = currentErrors;
      return rest;
    });
  };

  const blurHandler = (keyName) => {
    const username = formRef.current?.username.value;
    const isUsernameValid =
      checkMaxLength(username, 10) && checkMinLength(username, 3);

    const email = formRef.current?.email.value;
    const isEmailValid = checkEmail(email);

    const password = formRef.current?.password.value;
    const isPasswordValid =
      checkMaxLength(password, 12) && checkMinLength(password, 5);

    const confirmPassword = formRef.current?.confirmPassword.value;
    const isConfirmPasswordValid =
      checkMaxLength(confirmPassword, 12) && checkMinLength(confirmPassword, 5);

    if (keyName === formFields.username) {
      if (!isUsernameValid) {
        addToValidationErrors(
          formFields.username,
          "Username should be between 3 and 10 chars"
        );
      } else {
        removeValidationErrors(
          formFields.username,
          "Username should be between 3 and 10 chars"
        );
      }
    }

    if (keyName === formFields.email) {
      if (!isEmailValid) {
        addToValidationErrors(formFields.email, "Invalid email");
      } else {
        removeValidationErrors(formFields.email, "Invalid email");
      }
    }

    if (keyName === formFields.password) {
      if (!isPasswordValid) {
        addToValidationErrors(
          formFields.password,
          "Password should be between 5 and 12 chars"
        );
      } else {
        removeValidationErrors(
          formFields.password,
          "Password should be between 5 and 12 chars"
        );
      }
    }

    if (keyName === formFields.confirmPassword) {
      if (!isConfirmPasswordValid) {
        addToValidationErrors(
          formFields.confirmPassword,
          "Password should be between 5 and 12 chars"
        );
      } else if (password !== confirmPassword) {
        addToValidationErrors(
          formFields.confirmPassword,
          "Passwords missmatch"
        );
      } else {
        setValidationErrors((currentErrors) => {
          const { confirmPassword, ...rest } = currentErrors;
          return rest;
        });
      }
    }
  };

  return (
    <div className="register-box">
      <h1>Register</h1>
      <h4>It's free and only take a minute</h4>
      <form method="POST" onSubmit={onSubmit} ref={formRef}>
        <label htmlFor="username">Username</label>
        <div className="form-group">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username.."
            onBlur={() => blurHandler(formFields.username)}
          />
          {validationErrors?.username && (
            <div
              id="validationServerUsernameFeedback"
              className="invalid-feedback"
            >
              {validationErrors.username}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email.."
            onBlur={() => blurHandler(formFields.email)}
          />
          {validationErrors?.email && (
            <div
              id="validationServerUsernameFeedback"
              className="invalid-feedback"
            >
              {validationErrors.email}
            </div>
          )}{" "}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password.."
            onBlur={() => blurHandler(formFields.password)}
          />
          {validationErrors?.password && (
            <div
              id="validationServerUsernameFeedback"
              className="invalid-feedback"
            >
              {validationErrors.password}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password.."
            onBlur={() => blurHandler(formFields.confirmPassword)}
          />
          {validationErrors?.confirmPassword && (
            <div
              id="validationServerUsernameFeedback"
              className="invalid-feedback"
            >
              {validationErrors.confirmPassword}
            </div>
          )}
        </div>
        <input
          type="submit"
          value="REGISTER"
          className="btn-hover"
          //disabled={validationErrors ? "disabled" : " "}
        />
      </form>
      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};
