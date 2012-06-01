var name = "youtube";

head(name, function (socket, ghetto) {
    var $frame = null;

	socket.on('video', function (id) {
		if ($frame) {
			$frame.attr('src', 'http://www.youtube.com/embed/' + id + '?autoplay=1');
		}
	});
	ghetto.on('render', function ($el) {
		$frame = $('<iframe type="text/html" width="' + $el.width() + '"' +
				' height="' + $el.height() + '"' +
				' src="" frameborder="0"/>');
		$el.html($frame);
	});	
});

tail(name, function (socket, ghetto) {
	var $url_button = $("<button>Show Video</button>");
	var parser = document.createElement('a');
	$url_button.click(function () {
		var url = prompt("Enter a youtube url");
		parser.href = url;
		socket.emit("video", url);
	});

	ghetto.on('render', function ($el) {
		$el.html($url_button);
	});
});

server(name, function (youtube_io) {
    youtube_io.on('connection', function (socket) {
        socket.on("video", function (id) {
            socket.broadcast.emit("video", id);
        });
    });
});
