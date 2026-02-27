const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    pityCounter: { type: Number, default: 0 }, 
    inventory: {
        legendary: { type: Number, default: 0 },
        rare: { type: Number, default: 0 },
        common: { type: Number, default: 0 }
    }
});

module.exports = mongoose.model('User', userSchema);
