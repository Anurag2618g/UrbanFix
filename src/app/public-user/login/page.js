"use client";
import { useState } from "react";
import Link from "next/link";
import "../../globals.css";

export default function PublicUserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Public User Login\nEmail: ${email}`);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Public User Login</h2>
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
        <button type="submit" style={{ padding: "8px 16px" }}>Login</button>
      </form>
      <p>
        Don&apos;t have an account? <Link href="/public-user/signup">Sign Up</Link>
      </p>
    </div>
  );
}
