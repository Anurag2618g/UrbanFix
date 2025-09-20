"use client";
import { useState } from "react";
import Link from "next/link";
import "../../style/pu-sign.css";

export default function PublicSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    alert(`Signup successful!\nEmail: ${email}`);
    // TODO: connect backend API
  };

  return (
    <div className="public-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link href="/public-user/login">Login</Link>
      </p>
    </div>
  );
}
