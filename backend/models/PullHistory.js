const mongoose = require('mongoose');

const pullHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rarity: String, // 'Legendary', 'Rare', 'Common'
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PullHistory', pullHistorySchema);
