"use strict";
exports.__esModule = true;
var express = require("express");
var routes_1 = require("./routes/routes"); // TSOA Routes
var app = express();
var port = 3000;
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// })
// .listen(port, () => {
//     console.log(`Server listening to port ${port}`);
// })
routes_1.RegisterRoutes(app);
app.listen(port, function () {
    console.log("Server started listening to port " + port);
});
