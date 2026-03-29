const mongoose = require('mongoose');

const pullHistorySchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    rarity: { 
        type: String, 
        // ENUM strictly enforces our new 5-tier system
        enum: ['Legendary', 'Epic', 'Rare', 'Uncommon', 'Common'], 
        required: true
    },
    pointsEarned: { 
        type: Number, 
        default: 0 // Great for tracking the exact point value of this specific pull
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('PullHistory', pullHistorySchema);