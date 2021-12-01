# transaction-app
Deployed App Link - https://test-transaction-app.herokuapp.com

Tech Stack: Backend -> Node.js + MongoDB, Frontend: Angular

Folder Structure:

    1. /app -> Has all the backend routes, data models, controllers for actions performed

        1.1 /app/routes -> Defines the allowed routes for wallet and transactions. Not allowed actions are left unimplemented
        1.2 /app/models -> Defines the schema model for wallet and transaction tables and loaded in mongoose
        1.3 /app/controllers -> implements the route defined in /app/routes, processes data, does the database actions and sends response

    2. /config -> Has database config storing the connection string to connect to mongoDB Atlas server

    3. /my-angular-app -> Has the frontend implementation, packages, configs related
        3.1 /my-angular-app/src/app -> Has the app and the read component for home page and list of transactions page
        3.2 /my-angular-app/src/util -> Has the utility functions implemented, currently sort definition for transactions page

    4. server.js -> Has the server implementation 

API Definitions:

    1. POST /setup { name: string, balance: Number } - Creates a new wallet with name and initial balance
    2. GET /wallet - Gets all wallets from DB
    3. GET /wallet/:walleId - Get the information of wallet :walletId
    4. GET /transactions - Gets all the transactions from DB
    5. GET /transactions?walletId=:walletId - Get all transactions corresponding to the :walletId
    6. POST /transact/:walletId { amount: Number, description: string } - Create a new transaction in the wallet :walletId and update the balance identifying the type as CREDIT/DEBIT based on amount
