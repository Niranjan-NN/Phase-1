const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'school';

const client = new MongoClient(uri);

async function connectDB() {
  await client.connect();
  return client.db(dbName);
}

module.exports = connectDB;
