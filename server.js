var express = require('express');
var app = express();
var http = require("http").Server(app); 

app.use(express.static(__dirname + "/"));  
app.all('/', function (req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    console.log(__dirname);
    res.sendFile('source/ng-app.html', { root: __dirname });
});

app.all('/test', function (req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    console.log(__dirname);
    res.sendFile('test/test.html', { root: __dirname });
});

http.listen(1337, function () {
    console.log("Server is running on port 1337");

});
