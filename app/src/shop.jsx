// app/src/shop.jsx
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snap) => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const addToCollection = async (product) => {
    if (!user) return alert("Please sign in to save to your collection.");
    await addDoc(collection(db, "collections"), {
      userId: user.id,
      userEmail: user.primaryEmailAddress?.emailAddress || "",
      item: product,
      createdAt: new Date()
    });

    // small toast
    const t = document.createElement("div");
    t.className = "toast";
    t.innerText = `${product.name} added to your collection ✨`;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  };

  return (
    <section className="shop-grid">
      {products.length === 0 ? (
        <p className="muted">No products yet — ask the admin to add some.</p>
      ) : (
        products.map(p => (
          <div key={p.id} className="product-card">
            <img src={p.image || "https://via.placeholder.com/400x300"} alt={p.name} />
            <h3>{p.name}</h3>
            <p className="muted">${(p.price ?? 0).toFixed(2)}</p>
            <button className="btn" onClick={() => addToCollection(p)}>Add to Collection</button>
          </div>
        ))
      )}
    </section>
  );
}
