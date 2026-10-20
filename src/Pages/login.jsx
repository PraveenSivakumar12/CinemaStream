
import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

function Login() {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    remember: false,
    acceptedTerms: false,
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (mode === "register") {
      if (form.password !== form.confirmPassword) {
        setMessage("Passwords do not match.");
        return;
      }

      if (!form.acceptedTerms) {
        setMessage("Please accept the Terms and Privacy Policy.");
        return;
      }

      setMessage("Registration form validated. Authentication is not connected yet.");
      return;
    }

    if (mode === "forgot") {
      setMessage("Password recovery will be available after authentication is connected.");
      return;
    }

    setMessage("Login form validated. Authentication is not connected yet.");
  }

  function changeMode(nextMode) {
    setMode(nextMode);
    setMessage("");
    setShowPassword(false);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-brand">
          CINEMA<span>STREAM</span>
        </Link>

        <p className="auth-subtitle">
          Your next favourite movie is waiting.
        </p>

        {mode === "login" && (
          <>
            <h1>Welcome back</h1>
            <p className="auth-description">
              Sign in to continue watching.
            </p>
          </>
        )}

        {mode === "register" && (
          <>
            <h1>Create account</h1>
            <p className="auth-description">
              Join Cinema Stream today.
            </p>
          </>
        )}

        {mode === "forgot" && (
          <>
            <h1>Reset password</h1>
            <p className="auth-description">
              Enter your email to recover your account.
            </p>
          </>
        )}

        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <>
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />

              <label htmlFor="username">Username (optional)</label>
              <input
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Choose a username"
                autoComplete="username"
              />
            </>
          )}

          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />

          {mode !== "forgot" && (
            <>
              <label htmlFor="password">Password</label>

              <div className="password-field">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete={
                    mode === "register"
                      ? "new-password"
                      : "current-password"
                  }
                  minLength={8}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </>
          )}

          {mode === "register" && (
            <>
              <label htmlFor="confirmPassword">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                minLength={8}
                required
              />

              <label className="auth-checkbox">
                <input
                  type="checkbox"
                  name="acceptedTerms"
                  checked={form.acceptedTerms}
                  onChange={handleChange}
                />
                <span>
                  I agree to the Terms of Service and Privacy Policy.
                </span>
              </label>
            </>
          )}

          {mode === "login" && (
            <div className="auth-options">
              <label className="auth-checkbox">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="text-button"
                onClick={() => changeMode("forgot")}
              >
                Forgot password?
              </button>
            </div>
          )}

          {message && (
            <p className="auth-message" role="status">
              {message}
            </p>
          )}

          <button type="submit" className="auth-submit">
            {mode === "login" && "Sign In"}
            {mode === "register" && "Create Account"}
            {mode === "forgot" && "Reset Password"}
          </button>
        </form>

        <div className="auth-switch">
          {mode === "login" && (
            <p>
              New to Cinema Stream?{" "}
              <button onClick={() => changeMode("register")}>
                Create an account
              </button>
            </p>
          )}

          {mode === "register" && (
            <p>
              Already registered?{" "}
              <button onClick={() => changeMode("login")}>
                Sign in
              </button>
            </p>
          )}

          {mode === "forgot" && (
            <p>
              Remembered your password?{" "}
              <button onClick={() => changeMode("login")}>
                Back to login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
