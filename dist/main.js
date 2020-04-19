"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var port = 3000;
app.get('/', function (req, res) {
    res.send('Hello World!');
})
    .listen(port, function () {
    console.log("Server listening to port " + port);
});
