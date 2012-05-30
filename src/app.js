var express = require('express'),
    http = require('http');

var app = express();
var server = http.createServer(app);

app.use(express.static(__dirname + '/head'));
app.use('/lib', express.static(__dirname + '/lib'));
app.use('/_', express.static(__dirname + '/tail'));

var io = require('socket.io').listen(server);

io.sockets.on("connection", function (socket) {
	socket.emit("news", {hello: "world"});
});


server.listen(3000);


