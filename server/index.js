// server/index.js
import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Mock payment endpoint
app.post("/api/pay", (req, res) => {
  const { method, amount, userEmail } = req.body;
  console.log("Payment request:", { method, amount, userEmail });
  // Simulate a successful payment response
  setTimeout(() => {
    res.json({ success: true, message: "Payment accepted (simulated)", method, amount });
  }, 700);
});

// Serve static frontend (production)
app.use(express.static(path.join(__dirname, "..", "app", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "app", "dist", "index.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
