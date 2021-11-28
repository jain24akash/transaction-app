
const Transactions = require('../models/transactions.model.js');
const walletModel = require('../models/wallet.model.js');
const sessionPromise = walletModel.startSession();


// Create and Save a new transaction
exports.create = async (req, res) => {
    try {
        session = await Promise.resolve(sessionPromise);
        await session.startTransaction();
        walletModel.findById(req.params.walletId)
            .session(session)
            .then(async wallet => {
                if (!wallet) {
                    return res.status(404).send({
                        message: "Wallet not found with id " + req.params.walletId
                    });
                }
                console.log(parseFloat(parseFloat(wallet.balance) + parseFloat(req.body.amount)).toFixed(4));
                // update wallet balance, use optimistic locking to prevent race conditions
                await walletModel.findOneAndUpdate({ _id: req.params.walletId, updatedAt: wallet.updatedAt }, {
                    $set: {
                        balance: parseFloat(parseFloat(wallet.balance) + parseFloat(req.body.amount)).toFixed(4)
                    }
                }, { returnNewDocument: true })
                    .session(session)
                    .then(async updatedDocument => {
                        if (updatedDocument) {
                            console.log(`Document To be updated: ${updatedDocument}.`);
                        } else {
                            await session.abortTransaction();
                            res.status(404).send("No document matches the provided query.");
                        }
                    })
                    .catch(async err => {
                        await session.abortTransaction();
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the transaction."
                        });
                    });;

                // Create a Transaction
                const transact = new Transactions({
                    amount: parseFloat(req.body.amount).toFixed(4),
                    walletId: req.params.walletId,
                    balance: parseFloat(parseFloat(wallet.balance) + parseFloat(req.body.amount)).toFixed(4),
                    description: req.body.description,
                    type: req.body.amount > 0 ? 'CREDIT' : 'DEBIT'
                });

                let transaction;
                // Save transaction in the database
                await transact.save({ session })
                    .then(data => {
                        transaction = data;
                    }).catch(async err => {
                        await session.abortTransaction();
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the transaction."
                        });
                    });

                await session.commitTransaction();
                res.send(transaction);

            }).catch(async err => {
                await session.abortTransaction();
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Wallet not found with id " + req.params.walletId
                    });
                }
                return res.status(500).send({
                    message: err.message
                });

            })
    } catch (error) {
        await session.abortTransaction();
        return res.status(500).send({ message: error.message });
    }
};

// Retrieve and return all transactions from the database.
exports.findAll = (req, res) => {
    if(!req.query.skip){
        req.query.skip = 0;
    }
    if(!req.query.limit){
        req.query.limit =100;
    }
    Transactions.find(req.query).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit))
        .then(transaction => {
            res.send(transaction);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving transactions."
            });
        });
};

// // Find a single transaction with a transactionId
// exports.findOne = (req, res) => {

// };

// // Update a transaction identified by the transactionId in the request
// exports.update = (req, res) => {

// };

// // Delete a transaction with the specified transactionId in the request
// exports.delete = (req, res) => {

// };