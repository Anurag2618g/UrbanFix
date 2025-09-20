"use client";
import { useState } from "react";
import Link from "next/link";
import "../../style/au-sign.css";

export default function AuthoritySignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [govtId, setGovtId] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/authority/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, govtId }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Authority signup successful!");
    } else {
      alert("Invalid government ID or already registered.");
    }
  };

  return (
    <div className="authority-container">
      <h2>Authority Sign Up</h2>
      <form onSubmit={handleSignup}>
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
        <input
          type="text"
          placeholder="Government ID"
          value={govtId}
          onChange={(e) => setGovtId(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link href="/authority/login">Login</Link>
      </p>
    </div>
  );
}
