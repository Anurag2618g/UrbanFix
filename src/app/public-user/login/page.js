"use client";
import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, User, ArrowRight } from "lucide-react";
import "../../style/pu-login.css";

export default function AuthorityLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/authority/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Authority logged in!");
        window.location.href = "/public-user/dashboard";
      } else {
        setErrors({ general: "Invalid credentials. Please try again." });
      }
    } catch (error) {
      console.error(error);
      setErrors({ general: "Login failed. Please check your connection and try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="background-decorations">
        <div className="bg-decoration bg-decoration-1"></div>
        <div className="bg-decoration bg-decoration-2"></div>
      </div>
      
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">
              <User className="icon" />
            </div>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to your authority account</p>
          </div>

          {errors.general && (
            <div className="error-message">
              <p>{errors.general}</p>
            </div>
          )}

          <div className="login-form">
            <div className="input-group">
              <label className="input-label">Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({...errors, email: ""});
                  }}
                  className={`input-field ${errors.email ? 'input-error' : ''}`}
                  required
                />
              </div>
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({...errors, password: ""});
                  }}
                  className={`input-field ${errors.password ? 'input-error' : ''}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff className="toggle-icon" /> : <Eye className="toggle-icon" />}
                </button>
              </div>
              {errors.password && <p className="field-error">{errors.password}</p>}
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" className="checkbox" />
                <span>Remember me</span>
              </label>
              <button type="button" className="forgot-password">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              onClick={handleLogin}
              disabled={isLoading}
              className="login-button"
            >
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="button-arrow" />
                </>
              )}
            </button>
          </div>

          <div className="signup-link">
            <p>
              Don t have an account?{" "}
              <button 
                onClick={() => window.location.href = "/authority/signup"}
                className="signup-button"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>

        <div className="login-footer">
          <p>Protected by industry-standard security</p>
        </div>
      </div>
    </div>
  );
}