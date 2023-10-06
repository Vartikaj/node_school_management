const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Provide ip for connection instead of localhost
const dbConnect = 'mongodb://127.0.0.1:27017/school';
mongoose.Promise = global.Promise;

mongoose.connect(dbConnect, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

module.exports = router;