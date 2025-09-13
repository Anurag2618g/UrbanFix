"use client";
import Link from "next/link";
import "./main.css";

export default function HomePage() {
  return (
    <div className="home-container">
      <h1>Civic Issue Portal</h1>
      <p>Select your login type:</p>
      <Link href="/public-user/login">
        <button className="citizen-btn">Public Login</button>
      </Link>
      <Link href="/authority/login">
        <button className="authority-btn">Authority Login</button>
      </Link>
    </div>
  );
}
