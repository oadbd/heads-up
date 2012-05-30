ghetto.youtube = function (socket, ghetto) {
	var $frame = null;
	socket.on('message', function (id) {
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
};
