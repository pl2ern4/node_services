var express = require('express');
const bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 8080;
let queryDatabase = require('./queryDatabase');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/get', (request, response, next)=>{
    queryDatabase.getData('get', request.query, (req,res)=>{
        response.json(req);
    });  
});

app.post('/update', (request, response, next)=>{
    queryDatabase.getData('update', request.body, (req,res)=>{
        response.json(req);
    });
});

app.post('/delete', (request, response, next)=>{
    queryDatabase.getData('delete', request.body, (req,res)=>{
        response.json(req);
    });
});

app.post('/insert', (request, response, next)=>{
    queryDatabase.getData('insert', request.body, (req,res)=>{
        response.json(req);
    });
});

app.get('/', (req, res) =>
{
    res.send("Hello")
});

app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});

