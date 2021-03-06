module.exports = (app) => {
    const transactions = require('../controllers/transactions.controller.js');

    // Create a new transaction
    app.post('/transact/:walletId', transactions.create);

    // Retrieve all transaction
    app.get('/transactions', transactions.findAll);

    // Retrieve a single transaction with Id
    app.get('/transaction/:id', transactions.findOne);

    // Update a transaction
    app.put('/transactions/:id', transactions.update);

    // Delete a transaction with Id
    app.delete('/transactions/:id', transactions.delete);
}