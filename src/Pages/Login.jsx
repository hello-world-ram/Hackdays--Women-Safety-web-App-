import React from "react";

function Login({ setPage }) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🛡</div>

        <h1>Welcome web APP</h1>
        <p>Your safety dashboard is one step away</p>

        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>

        <button className="auth-btn" onClick={() => setPage("home")}>
          Login
        </button>

        <div className="auth-links">
          <button onClick={() => setPage("forgot")}>Forgot Password?</button>
          <button onClick={() => setPage("signup")}>Create Account</button>
        </div>
      </div>
    </div>
  );
}

export default Login;