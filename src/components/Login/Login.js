import "./Login.css";

export const Login = () => {
  return (
    <div className="login-box">
      <h1>Login</h1>
      <form method="POST">
        <label>Email</label>
        <input type="text" name placeholder="Email.." />
        <label>Password</label>
        <input type="password" name placeholder="Password.." />
        <input type="submit" value={`Login`} />
      </form>
      <p>
        Not have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};
