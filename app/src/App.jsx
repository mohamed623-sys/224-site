// app/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";

import Shop from "./shop.jsx";
import Cart from "./cart.jsx";
import AdminPanel from "./admin.jsx";
import Custom from "./custom.jsx";
import Collection from "./collection.jsx";

export default function App() {
  return (
    <Router>
      <div className="background">
        <div className="stars" />
        <div className="moon" />
        <div className="stars2" />

        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/custom" element={<Custom />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>

        <footer>
          <p>© 2025 224 — Today · Tomorrow · Forever • Built by Mohamed</p>
        </footer>
      </div>
    </Router>
  );
}

function Header() {
  const { user } = useUser() || {};
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const isAdmin = user?.primaryEmailAddress?.emailAddress === adminEmail;

  return (
    <nav>
      <h2 className="logo">224 🌌</h2>
      <div className="navlinks">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/collection">My Collection</Link>
        <Link to="/custom">Custom</Link>
        <Link to="/cart">Cart</Link>
        {isAdmin && <Link to="/admin">Admin</Link>}
        <SignedOut>
          <SignInButton mode="modal">
            <button className="btn">Sign In</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <div className="hero">
      <h1>224 — Today · Tomorrow · Forever</h1>
      <p>Cosmic designs, limited drops, and custom-made magic.</p>
      <a className="btn" href="/shop">Start Shopping</a>
    </div>
  );
}
