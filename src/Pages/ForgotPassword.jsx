export default function ForgotPassword({ setPage }) {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Reset Password</h2>
        <input placeholder="Enter Email" />
        <button>Send Reset Link</button>
        <p className="link" onClick={() => setPage("login")}>
          Back
        </p>
      </div>
    </div>
  );
}