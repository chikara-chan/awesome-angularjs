var proxy = require("./proxy");
var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var app = express();

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/src'));

app.all("/api", proxy); 
app.get('/*', function(req, res) {
	res.sendFile(__dirname + '/src/index.html');
});

app.listen(3000);

console.log('Listening on port 3000');