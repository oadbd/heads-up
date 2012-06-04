_callbacks = {};

head = function (name, cb) {
    _callbacks[name] = cb;
};
tail = function () {};
body = function () {};


$(function () {
/*
	$(document.body).append("<div id='c'></div>");
	
	var $c = $("#c");
	$c.css("width", document.body.offsetWidth + "px");
	$c.css("height", document.body.offsetHeight + "px"); 

	var youtube_socket = io.connect("/youtube");
	var youtube_ghetto = _.clone(Backbone.Events);

	modules.youtube(youtube_socket, youtube_ghetto);
	youtube_ghetto.trigger('head_init');
	youtube_ghetto.trigger("render", $c);
	*/
});

