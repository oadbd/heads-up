var name = "time";

head(name, function (socket, ghetto) {
    var $time = $("<div class='time' style='font-size: 6em;'></div>");
    var $hour = $("<span></span>");
    var $minute = $("<span></span>");
    var $second = $("<span></span>");
    $time.append($hour,"<span>:</span>",$minute,"<span>:</span>",$second)
    var $date = $("<div class='date'></div>");
	
	var timoutId = null;
	var setTime = function () {
        //braindead implementation
        var now = new Date();
        var hours = now.getHours();
        hours = hours > 12 ? hours - 12 : hours;
        var minutes = now.getMinutes();
        minutes = (minutes > 9 ? "" : "0") + minutes;
        var seconds = now.getSeconds();
        seconds = (seconds > 9 ? "" : "0") + seconds;
        
        $hour.text(hours);
        $minute.text(minutes);
        $second.text(seconds);
    };
	
	socket.on('stop', function () {
	    if (timeoutId) {
	        clearInterval(timeoutId);
    	    timeoutId = null;
	    }
	});
	
	socket.on('start', function () {
	    if (!timeoutId) {
    	    timeoutId = setInterval(setTime, 200);
	    }
	});
	
	ghetto.on('render', function ($el) {
        $el.append($time, $date);
        timeoutId = setInterval(setTime, 200);
	});	
});

tail(name, function (socket, ghetto) {
    var $start = $("<a href='#'>Start</a>");
    var $stop = $("<a href='#'>Stop</a>");
    
    $start.on('click', function (e) {
        e.preventDefault();
        socket.emit('start');
    });
    $stop.on('click', function (e) {
        e.preventDefault();
        socket.emit('stop');
    });
    
    ghetto.on('render', function ($el) {
        $el.append($start, $stop);
    });
});

server(name, function (time_io) {
    time_io.on('connection', function (socket) {
        console.log("CONNECTION");
        socket.on("start", function () {
            console.log("START");
            socket.broadcast.emit("start");
        });
        socket.on("stop", function () {
            console.log("STOP");
            socket.broadcast.emit("stop");
        });
    });
});
