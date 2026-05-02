export default function Signup({ setPage }) {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Signup</h2>
        <input placeholder="Email" />
        <input placeholder="Password" />
        <button>Create Account</button>
        <p className="link" onClick={() => setPage("login")}>
          Back to Login
        </p>
      </div>
    </div>
  );
}