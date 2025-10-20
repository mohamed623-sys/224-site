// app/src/custom.jsx
import React, { useState } from "react";
import { sendOrderEmail } from "./emailjsClient";

export default function Custom() {
  const [form, setForm] = useState({ user_name: "", user_email: "", message: "" });
  const [status, setStatus] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const res = await sendOrderEmail(form);
    setStatus(res.success ? "Sent! We'll contact you soon." : "Failed to send.");
    if (res.success) setForm({ user_name: "", user_email: "", message: "" });
  };

  return (
    <div style={{ padding: 30, maxWidth: 700, margin: "0 auto" }}>
      <h2>Custom Design Request</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
        <input required placeholder="Your name" value={form.user_name} onChange={e => setForm({ ...form, user_name: e.target.value })} />
        <input required placeholder="Your email" value={form.user_email} onChange={e => setForm({ ...form, user_email: e.target.value })} />
        <textarea required placeholder="Describe your idea" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={6} />
        <button className="btn" type="submit">Send Request</button>
      </form>
      {status && <p style={{ marginTop: 12 }}>{status}</p>}
    </div>
  );
}
