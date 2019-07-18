var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
let queryDatabase = require('./queryDatabase');

app.get('/get', (request, response, next)=>{
    queryDatabase.getData('get', request.query, (req,res)=>{
        response.json(req);
    });  
});

app.get('/update', (request, response, next)=>{
    queryDatabase.getData('update', request.query, (req,res)=>{
        response.json(req);
    });
});

app.get('/delete', (request, response, next)=>{
    queryDatabase.getData('delete', request.query, (req,res)=>{
        response.json(req);
    });
});

app.get('/insert', (request, response, next)=>{
    queryDatabase.getData('insert', request.query, (req,res)=>{
        response.json(req);
    });
});

app.get('/', (req, res) => res.send('Hello World with Express'));
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});