"use client";
import { useState } from "react";
import Link from "next/link";
import "../../au-login.css";

export default function AuthorityLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/authority/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Authority logged in!");
      window.location.href = "/authority/dashboard";
    } else {
      alert("Invalid credentials.");
    }
  };

  return (
    <div className="authority-container">
      <h2>Authority Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        {"Don't have an account? "} <Link href="/authority/signup">Sign Up</Link>
      </p>
    </div>
  );
}
