import "./Register.css";

export const Register = () => {
  return (
    <div className="register-box">
      <h1>Register</h1>
      <h4>It's free and only take a minute</h4>
      <form action="#" method>
        <label>Username</label>
        <input type="text" name placeholder="Username.." />
        <label>Email</label>
        <input type="text" name placeholder="Email.." />
        <label>Password</label>
        <input type="password" name placeholder="Password.." />
        <label>Confirm Password</label>
        <input type="password" name placeholder="Confirm Password.." />
        <input type="submit" value="Register" />
      </form>
      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};
