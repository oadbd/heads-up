global._callbacks = {};
global.head = function () {};
global.tail = function () {};
global.body = function (name, cb) {
    _callbacks[name] = cb;
};

var express = require('express'),
    http = require('http');

var app = express();
var server = http.createServer(app);

app.use(express.static(__dirname + '/head'));
app.use('/lib', express.static(__dirname + '/lib'));
app.get('/modules', function (req, res) {
    //loop through each module and return it wrapped in (function () {}());
});
app.use('/_', express.static(__dirname + '/tail'));


//load each module


var io = require('socket.io').listen(server);
for (var name in _callbacks) {
    _callbacks[name](io.of("/" + name));    
}

server.listen(3000);

