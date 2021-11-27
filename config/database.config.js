const { MongoClient } = require("mongodb");
let url= 'mongodb+srv://jain24akash:GetReady@cluster0.i32wr.mongodb.net/test';
let client= new MongoClient(url);
module.exports = {
    client,
    url
}