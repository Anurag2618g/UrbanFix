// src/app/authority/login/page.js
"use client";
import { useState } from "react";
import Link from "next/link";
import "../../au-login.css";

export default function AuthorityLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call delay
        setTimeout(async () => {
            const response = await fetch("/api/authority/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                alert("Authority logged in successfully!");
                window.location.href = "/authority/dashboard";
            } else {
                alert("Invalid credentials. Please try again.");
            }
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="auth-login-container">
            <div className="auth-login-card">
                <div className="auth-header">
                    <div className="govt-logo">
                        <div className="logo-icon">
                            <span className="icon-shield">🛡️</span>
                        </div>
                        <h1>Smart Civic System</h1>
                    </div>
                    <h2>Government Authority Portal</h2>
                    <p>Issue Reporting & Resolution System</p>
                </div>

                <form onSubmit={handleLogin} className="auth-login-form">
                    <div className="input-group">
                        <label htmlFor="email">Official Email Address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="name@government.domain"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input-container">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <div className="remember-forgot">
                        <label className="remember-me">
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>
                        <Link href="/authority/forgot-password" className="forgot-link">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className={`login-btn ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner"></span>
                                Authenticating...
                            </>
                        ) : (
                            'Access Government Portal'
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p className="signup-prompt">
                        Need authorization access?{" "}
                        <Link href="/authority/signup" className="auth-link">
                            Request Account
                        </Link>
                    </p>
                    <div className="security-notice">
                        <span className="secure-badge">🔒 Secure Government Portal</span>
                        <p>Authorized Personnel Only • Activity Monitored</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
