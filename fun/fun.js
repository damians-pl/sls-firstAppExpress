const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json({ strict: false }));


// Method GET
app.get('/fun/:proxy', function (req, res) {

    // Your code
    res.send('Yes, You used method <b>'+ req.method +'</b> and param: <b>'+ req.params.proxy +'</b>');
});


// Method POST
app.post('/fun', function (req, res) {
    const data = req.body;

    // Your code
    res.send('Yes, You used method <b>'+ req.method +'</b> and param: <b>'+ JSON.stringify(data, null, 2) +'</b>');
});


// Method PUT
app.put('/fun', function (req, res) {
    const data = req.body;

    // Your code
    res.send('Yes, You used method <b>'+ req.method +'</b> and param: <b>'+ JSON.stringify(data, null, 2) +'</b>');
});


// Method DELETE
app.delete('/fun/:proxy', function (req, res) {

    // Your code
    res.send('Yes, You used method <b>'+ req.method +'</b> and param: <b>'+ req.params.proxy +'</b>');
});


module.exports.handler = serverless(app);