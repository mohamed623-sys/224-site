// app/src/collection.jsx
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";

export default function Collection() {
  const { user } = useUser();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "collections"), where("userId", "==", user.id));
    const unsub = onSnapshot(q, snap => setItems(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    return () => unsub();
  }, [user]);

  if (!user) return <div style={{ padding: 40, textAlign: "center" }}><h3>Please sign in to view your collection</h3></div>;

  return (
    <div className="collection">
      <h2>My Collection</h2>
      {items.length === 0 ? <p className="muted">No items yet.</p> : (
        <div className="grid">
          {items.map(d => (
            <div className="product-card" key={d.id}>
              <img src={d.item?.image || "https://via.placeholder.com/300"} alt={d.item?.name || d.name} />
              <h3>{d.item?.name || d.name}</h3>
              <p className="muted">${(d.item?.price ?? d.price ?? 0).toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
