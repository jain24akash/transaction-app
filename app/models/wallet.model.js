const mongoose = require('mongoose');

const walletSchema = mongoose.Schema({
    balance: Number,
    name: String,
    date: { type: Date, default: Date.now }
}, {
    timestamps: true
});

module.exports = mongoose.model('Wallet', walletSchema);