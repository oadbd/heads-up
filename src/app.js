var express = require('express'),
    http = require('http');

var app = express();
var server = http.createServer(app);

app.use(express.static(__dirname + '/head'));
app.use('/lib', express.static(__dirname + '/lib'));
app.use('/_', express.static(__dirname + '/tail'));

var io = require('socket.io').listen(server);

var youtube_io = io.of('/youtube');
youtube_io.on('connection', function (socket) {
	setTimeout(function () {
		socket.emit('video', "u1zgFlCw8Aw");
	}, 3000);
});

server.listen(3000);


