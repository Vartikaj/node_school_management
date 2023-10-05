const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const port = 3000;
const api = require('./dbConnection');
const helmet = require('helmet'); // SECURING OUR SITE FOR CLICKJACKING, CROSS-SITE-SCRIPTING ATTACKS

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }))
app.use('/api', api)

app.use('/admin', require('./routes/admin-route'))

app.options('*', function(req, res){
    res.sendStatus(200);
});


server.listen(port, (err) => {
    if(err) {
        throw err;
    }
    console.log('Node endpoint working')
});

module.exports = server;
