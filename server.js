var proxy = require("./proxy");
var express = require('express');
var app = express();

app.use(express.compress());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/src'));

app.all("/api", proxy); 
app.get('/*', function(req, res) {
	res.sendfile(__dirname + '/src/index.html');
});

app.listen(3000);

console.log('Listening on port 3000');