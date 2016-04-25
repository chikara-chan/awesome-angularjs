var http = require('http');
var querystring = require('querystring');

module.exports = function(req, res) {
    var postData = querystring.stringify(req.body);
    var options = {
        protocol: 'http:',
        host: 'www.??????.com',
        port: '80',
        method: req.method,
        path: req.originalUrl,
        headers: {
            'Content-Type': req.get('Content-Type') || 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    }
    var url = options.protocol + "//" + options.host + ':' + options.port + options.path;
    var request = http.request(options, function(response) {
        var body = '';
        response.setEncoding('utf8');
        response.on('data', function(data) {
            body += data;
        })
        response.on('end', function() {
            console.log('\n——————————————————————————————————————————————————');
            console.log("<<< " + url);
            console.log(">>> " + body);
            res.send(body);
        });

    })
    request.on('error', function(e) {
        console.log('\n——————————————————————————————————————————————————');
        console.log(url);
        console.log("Error: " + e.message);
    })
    request.write(postData);
    request.end();
};