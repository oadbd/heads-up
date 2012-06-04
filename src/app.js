global._callbacks = {};
global.head = function () {};
global.tail = function () {};
global.body = function (name, cb) {
    _callbacks[name] = cb;
};

var express = require('express'),
    fs = require('fs'),
    http = require('http');

var app = express();
var server = http.createServer(app);

app.use(express.static(__dirname + '/client'));
app.use('/lib', express.static(__dirname + '/lib'));
app.get('/modules', function (req, res) {
    res.writeHead(200, {"Content-Type": "text/javascript"});
    var path = __dirname + '/modules/'
    fs.readdir(path, function (err, files) {
        var processNextFile = function () {
            if (files.length > 0) {
                res.write("(function() {\n")
                var stream = fs.createReadStream(path + files.pop());
                stream.on('end', function () {
                    res.write("}());\n");
                    processNextFile();
                });
                stream.pipe(res, {end: false});
            } else {
                res.end();
            }
        };
        processNextFile();
    });
});


//load each module


var io = require('socket.io').listen(server);
for (var name in _callbacks) {
    _callbacks[name](io.of("/" + name));    
}

server.listen(3000);

