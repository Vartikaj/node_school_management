const { MongoClient } = require('mongodb');
const express = require('express');
const router = express.Router();

const url = 'mongodb://localhost:27017';

const client = new MongoClient(url);
// Database Name
const dbName = 'testdb';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('test');

  // the following code examples can be pasted here...

  return 'done.';
}
// mongoose.Promise = global.Promise;

// mongoose.connect(dbConnect, {
//     useNewUrlParser: true, 
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('Connected to MongoDB');
// }).catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
// });

main();

module.exports = router;