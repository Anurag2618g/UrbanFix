"use client";
import { useState } from "react";
import Link from "next/link";
import "../../style/pu-login.css";

export default function PublicUserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Public User Login\nEmail: ${email}`);
  };

  return (
    <div className="public-container">
      <h2>Public User Login</h2>
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
        Don&apos;t have an account? <Link href="/public-user/signup">Sign Up</Link>
      </p>
    </div>
  );
}
