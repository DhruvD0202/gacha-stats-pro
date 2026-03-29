const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    score: { type: Number, default: 0 }, // NEW: Needed for the leaderboard
    pityCounter: { type: Number, default: 0 }, 
    inventory: {
        legendary: { type: Number, default: 0 },
        epic: { type: Number, default: 0 },      // NEW
        rare: { type: Number, default: 0 },
        uncommon: { type: Number, default: 0 },  // NEW
        common: { type: Number, default: 0 }
    }
});

module.exports = mongoose.model('User', userSchema);