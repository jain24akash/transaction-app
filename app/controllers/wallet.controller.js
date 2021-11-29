const Wallet = require('../models/wallet.model.js');

// Create and Save a new Wallet
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Wallet name can not be empty"
        });
    }

    if(req.body.balance == null){
        req.body.balance = 0;
    }

    // Create a Wallet
    const wallet = new Wallet({ 
        balance: parseFloat(req.body.balance).toFixed(4),
        name: req.body.name
    });

    // Save Wallet in the database
    wallet.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Wallet."
        });
    });
};

// Retrieve and return all Wallets from the database.
exports.findAll = (req, res) => {
    if(!req.query.skip){
        req.query.skip = 0;
    }
    if(!req.query.limit){
        req.query.limit =100;
    }
    Wallet.find(req.query).skip(parseInt(req.query.skip)).limit(req.query.limit)
    .then(wallet => {
        res.send(wallet);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving wallet."
        });
    });
};

// Find a single Wallet with a WalletId
exports.findOne = (req, res) => {
    Wallet.findById(req.params.walletId)
    .then(wallet => {
        if(!wallet) {
            return res.status(404).send({
                message: "Wallet not found with id " + req.params.walletId
            });            
        }
        res.send(wallet);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Wallet not found with id " + req.params.walletId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving wallet with id " + req.params.walletId
        });
    });
};

// // Update a Wallet identified by the WalletId in the request
// exports.update = (req, res) => {

// };

// // Delete a Wallet with the specified WalletId in the request
// exports.delete = (req, res) => {

// };