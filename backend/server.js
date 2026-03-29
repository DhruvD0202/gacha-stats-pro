const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // NEW: Import CORS

dotenv.config();
const app = express();

// --- Middleware ---
// Allow requests from your Vite frontend
app.use(cors());
app.use(express.json());

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected: Ready for Gacha Stats"))
  .catch(err => console.error("❌ Database Connection Error:", err));

// --- API Routes ---
// This tells the server: "Any request going to /api/leaderboard should be handled by this file"
app.use('/api/leaderboard', require('./routes/leaderboardRoutes'));

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});