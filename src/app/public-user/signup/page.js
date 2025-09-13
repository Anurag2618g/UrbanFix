"use client";
import { useState } from "react";
import Link from "next/link";
import "../../globals.css";

export default function PublicSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    alert(`Signup successful!\nEmail: ${email}`);
    // TODO: connect backend API
  };

  return (
    <div style={{ maxWidth: "350px", margin: "80px auto", textAlign: "center" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "8px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "8px" }}
        />
        <button type="submit" style={{ padding: "10px" }}>Sign Up</button>
      </form>
      <p style={{ marginTop: "12px" }}>
        Already have an account? <Link href="/public-user/login">Login</Link>
      </p>
    </div>
  );
}
