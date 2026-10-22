
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import "./login.css";

const initialValues = {
  name: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  remember: false,
  acceptedTerms: false,
};

const emailSchema = Yup.string()
  .trim()
  .email("Enter a valid email address")
  .required("Email address is required");

const passwordSchema = Yup.string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters")
  .matches(/[A-Z]/, "Include at least one uppercase letter")
  .matches(/[a-z]/, "Include at least one lowercase letter")
  .matches(/[0-9]/, "Include at least one number")
  .matches(/[^A-Za-z0-9]/, "Include at least one special character");

function getValidationSchema(mode) {
  if (mode === "forgot") {
    return Yup.object({
      email: emailSchema,
    });
  }

  if (mode === "register") {
    return Yup.object({
      name: Yup.string()
        .trim()
        .min(2, "Name must contain at least 2 characters")
        .required("Full name is required"),

      email: emailSchema,

      username: Yup.string()
        .trim()
        .matches(
          /^[a-zA-Z0-9_]*$/,
          "Use only letters, numbers, and underscores"
        )
        .min(3, "Username must contain at least 3 characters")
        .max(20, "Username cannot exceed 20 characters"),

      password: passwordSchema,

      confirmPassword: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password")], "Passwords do not match"),

      acceptedTerms: Yup.boolean().oneOf(
        [true],
        "Please accept the Terms and Privacy Policy"
      ),
    });
  }

  return Yup.object({
    email: emailSchema,
    password: Yup.string().required("Password is required"),
  });
}

function Login() {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function changeMode(nextMode, resetForm) {
    setMode(nextMode);
    setShowPassword(false);
    setShowConfirmPassword(false);
    resetForm();
  }

  function renderFieldError(errors, touched, fieldName) {
    if (!touched[fieldName] || !errors[fieldName]) {
      return null;
    }

    return (
      <div className="auth-error field-error" role="alert">
        {errors[fieldName]}
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">CINEMASTREAM</div>

        <p className="auth-subtitle">
          Your next favourite movie is waiting.
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={getValidationSchema(mode)}
          validateOnBlur={true}
          validateOnChange={true}
          onSubmit={async (values, { setStatus }) => {
            setStatus("");

            // Frontend validation only. Connect your backend API here.
            if (mode === "register") {
              setStatus(
                "Registration validated successfully. Connect your backend to create your account."
              );
            } else if (mode === "forgot") {
              setStatus(
                "Email validated. Connect your password recovery API to continue."
              );
            } else {
              setStatus(
                "Login form validated. Connect your authentication API to sign in."
              );
            }
          }}
        >
          {({
            errors,
            touched,
            values,
            isSubmitting,
            status,
            resetForm,
            setFieldValue,
            setFieldTouched,
          }) => (
            <Form noValidate>
              <div className="auth-heading">
                <h2>
                  {mode === "login" && "Welcome back"}
                  {mode === "register" && "Create account"}
                  {mode === "forgot" && "Reset password"}
                </h2>

                <p className="auth-description">
                  {mode === "login" &&
                    "Sign in to continue watching."}
                  {mode === "register" &&
                    "Join Cinema Stream today."}
                  {mode === "forgot" &&
                    "Enter your email to recover your account."}
                </p>
              </div>

              {mode === "register" && (
                <>
                  <div className="form-group">
                    <label htmlFor="name">Full name</label>

                    <div className="field-row">
                      <Field
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        autoComplete="name"
                        className={
                          touched.name && errors.name
                            ? "input-invalid"
                            : ""
                        }
                        aria-invalid={Boolean(touched.name && errors.name)}
                        aria-describedby={
                          touched.name && errors.name
                            ? "name-error"
                            : undefined
                        }
                      />

                      {touched.name && errors.name && (
                        <div
                          id="name-error"
                          className="auth-error field-error"
                          role="alert"
                        >
                          {errors.name}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="username">
                      Username <span>(optional)</span>
                    </label>

                    <div className="field-row">
                      <Field
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Choose a username"
                        autoComplete="username"
                        className={
                          touched.username && errors.username
                            ? "input-invalid"
                            : ""
                        }
                        aria-invalid={Boolean(
                          touched.username && errors.username
                        )}
                      />

                      {renderFieldError(errors, touched, "username")}
                    </div>
                  </div>
                </>
              )}

              <div className="form-group">
                <label htmlFor="email">Email address</label>

                <div className="field-row">
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={
                      touched.email && errors.email ? "input-invalid" : ""
                    }
                    aria-invalid={Boolean(touched.email && errors.email)}
                    aria-describedby={
                      touched.email && errors.email
                        ? "email-error"
                        : undefined
                    }
                  />

                  {touched.email && errors.email && (
                    <div
                      id="email-error"
                      className="auth-error field-error"
                      role="alert"
                    >
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>

              {mode !== "forgot" && (
                <div className="form-group">
                  <label htmlFor="password">Password</label>

                  <div className="field-row">
                    <div
                      className={`password-field ${
                        touched.password && errors.password
                          ? "input-invalid"
                          : ""
                      }`}
                    >
                      <Field
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        autoComplete={
                          mode === "register"
                            ? "new-password"
                            : "current-password"
                        }
                        className="password-input"
                        aria-invalid={Boolean(
                          touched.password && errors.password
                        )}
                      />

                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword((previous) => !previous)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>

                    {renderFieldError(errors, touched, "password")}
                  </div>
                </div>
              )}

              {mode === "register" && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">
                    Confirm password
                  </label>

                  <div className="field-row">
                    <div
                      className={`password-field ${
                        touched.confirmPassword && errors.confirmPassword
                          ? "input-invalid"
                          : ""
                      }`}
                    >
                      <Field
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Re-enter your password"
                        autoComplete="new-password"
                        className="password-input"
                        aria-invalid={Boolean(
                          touched.confirmPassword && errors.confirmPassword
                        )}
                      />

                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowConfirmPassword((previous) => !previous)
                        }
                        aria-label={
                          showConfirmPassword
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                      >
                        {showConfirmPassword ? "Hide" : "Show"}
                      </button>
                    </div>

                    {renderFieldError(
                      errors,
                      touched,
                      "confirmPassword"
                    )}
                  </div>
                </div>
              )}

              {mode === "register" && (
                <div className="auth-options terms-option">
                  <label className="auth-checkbox">
                    <Field
                      type="checkbox"
                      name="acceptedTerms"
                      className="terms-checkbox"
                    />

                    <span>
                      I agree to the{" "}
                      <Link to="/terms">Terms of Service</Link> and{" "}
                      <Link to="/privacy">Privacy Policy</Link>.
                    </span>
                  </label>

                  {touched.acceptedTerms && errors.acceptedTerms && (
                    <div className="auth-error field-error terms-error" role="alert">
                      {errors.acceptedTerms}
                    </div>
                  )}
                </div>
              )}

              {mode === "login" && (
                <div className="auth-options">
                  <label className="auth-checkbox">
                    <Field type="checkbox" name="remember" />
                    <span>Remember me</span>
                  </label>

                  <button
                    type="button"
                    className="text-button"
                    onClick={() => changeMode("forgot", resetForm)}
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {status && (
                <div className="auth-message" role="status">
                  {status}
                </div>
              )}

              <button
                type="submit"
                className="auth-submit"
                disabled={isSubmitting}
              >
                {mode === "login" && "Sign In"}
                {mode === "register" && "Create Account"}
                {mode === "forgot" && "Reset Password"}
              </button>

              <div className="auth-switch">
                {mode === "login" && (
                  <>
                    New to Cinema Stream?{" "}
                    <button
                      type="button"
                      className="text-button"
                      onClick={() => changeMode("register", resetForm)}
                    >
                      Create an account
                    </button>
                  </>
                )}

                {mode === "register" && (
                  <>
                    Already registered?{" "}
                    <button
                      type="button"
                      className="text-button"
                      onClick={() => changeMode("login", resetForm)}
                    >
                      Sign in
                    </button>
                  </>
                )}

                {mode === "forgot" && (
                  <>
                    Remembered your password?{" "}
                    <button
                      type="button"
                      className="text-button"
                      onClick={() => changeMode("login", resetForm)}
                    >
                      Back to login
                    </button>
                  </>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
