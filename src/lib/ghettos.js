(function () {
    var cfg = {
        split: 'vertical',
        at: 0.66,
        
        left: {
            split: 'vertical',
            at: 0.5,
            
            left: {
                split: 'horizontal',
                at: 0.66,
                
                top: "LEFT TOP",
                bottom: "LEFT BOTTOM"
            },
            
            right: {
                split: 'horizontal',
                at: 0.66,
                
                top: {
                    split: 'horizontal',
                    at: 0.5,
                    
                    top: "TIME",
                    bottom: "WEATHER"
                },
                
                bottom: "CENTER BOTTOM"
            }
        },
        
        
        right: "RIGHT"
        
    };

    var layout = function ($content, config) {
        if (typeof config === "object") {
            //we do a split
            var ab = config.split === "horizontal" ? ["top", "bottom"] : ["left", "right"];
            var id = $content.id + "_";
            var $a = $('<div id="' + id + ab[0][0] + '" class="' + ab[0][0] + ' layout"></div>');
            var $b = $('<div id="' + id + ab[1][0] + '" class="' + ab[1][0] + ' layout"></div>');
            
            $a.css("position", "absolute").css("top", "0").css("left","0");
            $b.css("position", "absolute").css("top", "0").css("left","0");
            
            $content.append($a, $b);
            
            
            if (config.split ==="horizontal") {
                $a.css("width", "100%");
                $b.css("width", "100%");
                
                var h = parseInt($content.height() * config.at, 10);
                
                $a.css("height", h + "px");
                $b.css("height", ($content.height() - h) + "px");
                
                $b.css("bottom", "0");
                $b.css("top", "");
            } else {
                var w = parseInt($content.width() * config.at, 10);
                
                $a.css("width", w + "px");
                $b.css("width", ($content.width() - w) + "px");

                $a.css("height", $content.height() + "px");
                $b.css("height", $content.height() + "px");
                
                $b.css("right", "0");
                $b.css("left", "");
            }
            
            layout($a, config[ab[0]]);
            layout($b, config[ab[1]]);
        } else {
            $content.addClass("leaf");
            $content.append($("<div class='content'></div>").text(config));
        }
    
    }; 
    
    window.ghettos = function ($main) {
        $main.css("height", window.innerHeight + "px");
        $main.css("width", window.innerWidth + "px");
        layout($main, cfg);
    };
    
}());
