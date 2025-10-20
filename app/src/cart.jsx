// app/src/cart.jsx
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { db } from "./firebase";
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import { sendOrderEmail } from "./emailjsClient";

export default function Cart() {
  const { user } = useUser();
  const [items, setItems] = useState([]);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "collections"), where("userId", "==", user.id));
    const unsub = onSnapshot(q, snap => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [user]);

  const removeItem = async (id) => {
    await deleteDoc(doc(db, "collections", id));
  };

  const checkout = async () => {
    if (!user) { alert("Please sign in"); return; }
    if (items.length === 0) { alert("Your collection is empty"); return; }
    setProcessing(true);

    try {
      const order = {
        userId: user.id,
        userEmail: user.primaryEmailAddress?.emailAddress || "",
        items: items.map(i => i.item || i),
        total: items.reduce((s, it) => s + ((it.item?.price ?? it.price) || 0), 0),
        createdAt: new Date()
      };
      // save order
      await addDoc(collection(db, "orders"), order);

      // send confirmation
      await sendOrderEmail({
        user_name: user.firstName || user.fullName || "Customer",
        user_email: user.primaryEmailAddress?.emailAddress || "",
        message: `Order details: ${order.items.map(x => x.name).join(", ")} — Total: ${order.total}`
      });

      // clear user's collection (delete each)
      for (const it of items) {
        await deleteDoc(doc(db, "collections", it.id));
      }

      alert("✅ Checkout complete — email confirmation sent.");
    } catch (err) {
      console.error(err);
      alert("Checkout failed — see console.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Collection</h2>
      {!user ? <p>Please sign in to view your collection.</p> : (
        <>
          {items.length === 0 ? <p className="muted">No items in your collection yet.</p> : items.map(it => (
            <div className="cart-item" key={it.id}>
              <div>
                <strong>{it.item?.name || it.name}</strong>
                <p className="muted">${((it.item?.price ?? it.price) || 0).toFixed(2)}</p>
              </div>
              <div>
                <button className="btn" onClick={() => removeItem(it.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 18 }}>
            <button className="btn" onClick={checkout} disabled={processing}>{processing ? "Processing..." : "Checkout"}</button>
          </div>
        </>
      )}
    </div>
  );
}
