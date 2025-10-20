// app/src/admin.jsx
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AdminPanel() {
  const { user } = useUser();
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const isAdmin = user?.primaryEmailAddress?.emailAddress === adminEmail;

  const [product, setProduct] = useState({ name: "", price: "", image: "" });
  const [status, setStatus] = useState("");

  if (!isAdmin) return <div style={{ padding: 40, textAlign: "center" }}><h3>Access denied</h3></div>;

  const handleAdd = async () => {
    if (!product.name || !product.price) { setStatus("Enter name & price"); return; }
    setStatus("Adding...");
    await addDoc(collection(db, "products"), {
      name: product.name,
      price: parseFloat(product.price),
      image: product.image || "",
      createdAt: serverTimestamp()
    });
    setStatus("Product added ✅");
    setProduct({ name: "", price: "", image: "" });
    setTimeout(() => setStatus(""), 2200);
  };

  return (
    <div className="admin">
      <h2>Admin — Add Product</h2>
      <input placeholder="Name" value={product.name} onChange={e => setProduct({ ...product, name: e.target.value })} />
      <input placeholder="Image URL" value={product.image} onChange={e => setProduct({ ...product, image: e.target.value })} />
      <input placeholder="Price" value={product.price} onChange={e => setProduct({ ...product, price: e.target.value })} />
      <div style={{ marginTop: 12 }}>
        <button className="btn" onClick={handleAdd}>Add Product</button>
      </div>
      {status && <p style={{ marginTop: 12 }}>{status}</p>}
    </div>
  );
}
