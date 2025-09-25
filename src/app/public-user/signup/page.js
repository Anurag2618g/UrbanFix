"use client";
import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, UserPlus, ArrowRight, Check, X } from "lucide-react";
import "../../style/pu-sign.css";

export default function AuthoritySignup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    checks: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false
    }
  });

  const validatePassword = (password) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    const score = Object.values(checks).filter(Boolean).length;
    
    setPasswordStrength({ score, checks });
    return score >= 4; // Require at least 4 out of 5 criteria
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must meet security requirements";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'password') {
      validatePassword(value);
    }
    
    // Clear specific field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/authority/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: formData.email, 
          password: formData.password 
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Signup successful! Please login.");
        window.location.href = "/public-user/login";
      } else {
        setErrors({ general: "Signup failed. User may already exist." });
      }
    } catch (error) {
      console.error(error);
      setErrors({ general: "Signup failed. Please check your connection and try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength.score <= 2) return 'weak';
    if (passwordStrength.score === 3) return 'medium';
    return 'strong';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength.score <= 2) return 'Weak';
    if (passwordStrength.score === 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="signup-container">
      <div className="background-decorations">
        <div className="bg-decoration bg-decoration-1"></div>
        <div className="bg-decoration bg-decoration-2"></div>
      </div>
      
      <div className="signup-wrapper">
        <div className="signup-card">
          <div className="signup-header">
            <div className="signup-icon">
              <UserPlus className="icon" />
            </div>
            <h1 className="signup-title">Create Account</h1>
            <p className="signup-subtitle">Join our authority platform today</p>
          </div>

          {errors.general && (
            <div className="error-message">
              <p>{errors.general}</p>
            </div>
          )}

          <div className="signup-form">
            {/* Email input */}
            <div className="input-group">
              <label className="input-label">Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`input-field ${errors.email ? 'input-error' : ''}`}
                  required
                />
              </div>
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>

            {/* Password input */}
            <div className="input-group">
              <label className="input-label">Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
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
              
              {/* Password strength indicator */}
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div className={`strength-fill ${getPasswordStrengthColor()}`} 
                         style={{width: `${(passwordStrength.score / 5) * 100}%`}}></div>
                  </div>
                  <span className={`strength-text ${getPasswordStrengthColor()}`}>
                    {getPasswordStrengthText()}
                  </span>
                </div>
              )}
              
              {/* Password requirements */}
              {formData.password && (
                <div className="password-requirements">
                  <div className={`requirement ${passwordStrength.checks.length ? 'met' : ''}`}>
                    {passwordStrength.checks.length ? <Check className="req-icon" /> : <X className="req-icon" />}
                    <span>At least 8 characters</span>
                  </div>
                  <div className={`requirement ${passwordStrength.checks.uppercase ? 'met' : ''}`}>
                    {passwordStrength.checks.uppercase ? <Check className="req-icon" /> : <X className="req-icon" />}
                    <span>One uppercase letter</span>
                  </div>
                  <div className={`requirement ${passwordStrength.checks.lowercase ? 'met' : ''}`}>
                    {passwordStrength.checks.lowercase ? <Check className="req-icon" /> : <X className="req-icon" />}
                    <span>One lowercase letter</span>
                  </div>
                  <div className={`requirement ${passwordStrength.checks.number ? 'met' : ''}`}>
                    {passwordStrength.checks.number ? <Check className="req-icon" /> : <X className="req-icon" />}
                    <span>One number</span>
                  </div>
                  <div className={`requirement ${passwordStrength.checks.special ? 'met' : ''}`}>
                    {passwordStrength.checks.special ? <Check className="req-icon" /> : <X className="req-icon" />}
                    <span>One special character</span>
                  </div>
                </div>
              )}
              
              {errors.password && <p className="field-error">{errors.password}</p>}
            </div>

            {/* Confirm Password input */}
            <div className="input-group">
              <label className="input-label">Confirm Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`input-field ${errors.confirmPassword ? 'input-error' : ''} ${
                    formData.confirmPassword && formData.password === formData.confirmPassword ? 'input-success' : ''
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="password-toggle"
                >
                  {showConfirmPassword ? <EyeOff className="toggle-icon" /> : <Eye className="toggle-icon" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="field-error">{errors.confirmPassword}</p>}
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <p className="field-success">Passwords match!</p>
              )}
            </div>

            {/* Terms and conditions */}
            <div className="terms-group">
              <label className="terms-checkbox">
                <input type="checkbox" className="checkbox" required />
                <span>I agree to the <button type="button" className="terms-link">Terms of Service</button> and <button type="button" className="terms-link">Privacy Policy</button></span>
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              onClick={handleSignup}
              disabled={isLoading}
              className="signup-button"
            >
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="button-arrow" />
                </>
              )}
            </button>
          </div>

          {/* Login link */}
          <div className="login-link">
            <p>
              Already have an account?{" "}
              <button 
                onClick={() => window.location.href = "/public-user/login"}
                className="login-button"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="signup-footer">
          <p>Protected by industry-standard security</p>
        </div>
      </div>
    </div>
  );
}