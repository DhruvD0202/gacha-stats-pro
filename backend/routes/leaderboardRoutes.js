const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ==========================================
// 1. GET ROUTE: Fetch the Global Leaderboard
// Endpoint: GET http://localhost:5000/api/leaderboard
// ==========================================
router.get('/', async (req, res) => {
  try {
    // Fetch all users, but only grab their 'username' and 'score'
    // .sort({ score: -1 }) arranges them from highest to lowest
    const leaderboard = await User.find({}, 'username score')
                                  .sort({ score: -1 })
                                  .limit(100); // Only send the top 100 players
    
    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard." });
  }
});

// ==========================================
// 2. POST ROUTE: Save or Update Player Stats
// Endpoint: POST http://localhost:5000/api/leaderboard/save
// ==========================================
router.post('/save', async (req, res) => {
  try {
    // Extract the data sent by Axios from the React frontend
    const { username, score, pityCounter, inventory } = req.body;

    // Search the database to see if this player already exists
    let player = await User.findOne({ username });

    if (player) {
      // --- PLAYER EXISTS: Update their profile ---
      
      // Only overwrite their score if they beat their personal best!
      if (score > player.score) {
        player.score = score;
      }
      
      // Update their current pity counter
      player.pityCounter = pityCounter;

      // Accumulate their total inventory across all sessions
      if (inventory) {
          player.inventory.legendary += inventory.Legendary || 0;
          player.inventory.epic += inventory.Epic || 0;
          player.inventory.rare += inventory.Rare || 0;
          player.inventory.uncommon += inventory.Uncommon || 0;
          player.inventory.common += inventory.Common || 0;
      }
      
      await player.save();

    } else {
      // --- NEW PLAYER: Create a brand new database entry ---
      player = new User({
        username,
        score,
        pityCounter,
        inventory: {
          legendary: inventory?.Legendary || 0,
          epic: inventory?.Epic || 0,
          rare: inventory?.Rare || 0,
          uncommon: inventory?.Uncommon || 0,
          common: inventory?.Common || 0
        }
      });
      
      await player.save();
    }

    // Tell React the save was successful
    res.status(200).json({ message: "Data successfully synced with MongoDB!", player });

  } catch (error) {
    console.error("Error saving player data:", error);
    res.status(500).json({ error: "Failed to sync data with database." });
  }
});

module.exports = router;