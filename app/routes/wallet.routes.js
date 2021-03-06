module.exports = (app) => {
    const wallet = require('../controllers/wallet.controller.js');

    // Create a new Note
    app.post('/setup', wallet.create);

    // Retrieve all Notes
    app.get('/wallet', wallet.findAll);

    // Retrieve a single Note with noteId
    app.get('/wallet/:walletId', wallet.findOne);

    // Update a wallet with walletId
    app.put('/wallet/:walletId', wallet.update);

    // Delete a wallet with walletId
    app.delete('/wallet/:walletId', wallet.delete);
}