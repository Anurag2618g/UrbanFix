"use client";
import { useState } from "react";
import Link from "next/link";
import "../../globals.css";

export default function AuthorityLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // here we add  backend API for the authentication
    const response = await fetch("/api/authority/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Authority logged in!");
      // here we add the page location dashboard
      window.location.href = "/authority/dashboard";
    } else {
      alert("Invalid credentials.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Authority Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>
          Login
        </button>
      </form>
      
        <p>{"Don't have an account? "} <Link href="/authority/signup">Sign Up</Link></p>

      
    </div>
  );
}   