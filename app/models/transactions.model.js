const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    walletId: String,
    amount: Number,
    balance: Number,
    description: String,
    type: String,
    date: { type: Date, default: Date.now }
}, {
    timestamps: true
});

module.exports = mongoose.model('transactions', transactionSchema);