/**
 * Jquery SuperMap
 * 
 * @author 		Clay McIlrath
 * @license		http://www.opensource.org/licenses/mit-license.php
 */
(function ($) {
    $.fn.supermap = function (options) {
        var defaults = {
            position: 		'center',
            popupClass: 	'bubble',
            markerClass: 	'point',
            popup: 			'bubble',		// slide or bubble
            cookies: 		true,
            caption: 		true,
            setCenter: 		true,
            navigation: 	true,
            navSpeed: 		1000,
            navBtnClass: 	'map-move',
            outsideButtons: false,
            onMarkerClick: 	function () {},
            onPopupClose: 	function () {},
            onMapLoad: 		function () {}
        };
        
        var sets = $.extend({}, defaults, options);
        
        return this.each( function () 
        {
            var $this = $(this);
            $this.css({
                position: "relative",
                overflow: "hidden",
                cursor: "move"
            });
            
            $this.wrapInner($("<div />").addClass("imgContent").css({
                zIndex: "1",
                position: "absolute"
            }));
            
            var content = $this.find(".imgContent"),
                image = $this.find("img"),
                title = image.attr("alt"),
                point = $this.find("." + sets.markerClass),
                mouseDown = false,
                mx, my, ex, ey, imgw = image.width(),
                imgh = image.height(),
                divw = $this.width(),
                divh = $this.height();
                
            var cookies = {
                create: function (name, value, days) {
                    if (days) {
                        var date = new Date();
                        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                        var expires = "; expires=" + date.toGMTString()
                    } else {
                        var expires = ""
                    }
                    document.cookie = name + "=" + value + expires + "; path=/"
                },
                erase: function (name) {
                    cookies.create(name, "", -1)
                },
                read: function (name) {
                    var nameEQ = name + "=";
                    var ca = document.cookie.split(";");
                    for (var i = 0; i < ca.length; i++) {
                        var c = ca[i];
                        while (c.charAt(0) == " ") {
                            c = c.substring(1, c.length)
                        }
                        if (c.indexOf(nameEQ) == 0) {
                            return c.substring(nameEQ.length, c.length)
                        }
                    }
                    return null
                }
            };
            var map = {
                check: function (x, y) {
                    if (y < (divh - imgh)) {
                        y = divh - imgh
                    } else {
                        if (y > 0) {
                            y = 0
                        }
                    }
                    if (x < (divw - imgw)) {
                        x = divw - imgw
                    } else {
                        if (x > 0) {
                            x = 0
                        }
                    }
                    return {
                        x: x,
                        y: y
                    }
                },
                init: function (position) {
                    map.preloader();
                    switch (position) {
                    case "center":
                        var x = (divw - imgw) / 2,
                            y = (divh - imgh) / 2;
                        break;
                    case "top left":
                        var x = 0,
                            y = 0;
                        break;
                    case "top right":
                        var x = divw - imgw,
                            y = 0;
                        break;
                    case "bottom left":
                        var x = 0,
                            y = divh - imgh;
                        break;
                    case "bottom right":
                        var x = divw - imgw,
                            y = divh - imgh;
                        break;
                    default:
                        var new_position = position.split(" "),
                            x = -(new_position[0]),
                            y = -(new_position[1]);
                        if (y < (divh - imgh)) {
                            y = divh - imgh
                        } else {
                            if (y > 0) {
                                y = 0
                            }
                        }
                        if (x < (divw - imgw)) {
                            x = divw - imgw
                        } else {
                            if (x > 0) {
                                x = 0
                            }
                        }
                    }
                    if (sets.cookies) {
                        if (cookies.read("position") != null) {
                            var pos = cookies.read("position").split(","),
                                x = pos[0],
                                y = pos[1]
                        } else {
                            var x = (divw - imgw) / 2,
                                y = (divh - imgh) / 2
                        }
                    }
                    content.css({
                        top: y + "px",
                        left: x + "px"
                    })
                },
                preloader: function () {
                    var loadimg = new Image(),
                        src = image.attr("src");
                    image.css({
                        visibility: "hidden"
                    });
                    $this.append($("<div />").addClass("loader").css({
                        position: "absolute",
                        zIndex: "10",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%"
                    }));
                    $(loadimg).load(function () {
                        image.css({
                            visibility: "visible"
                        });
                        $this.find(".loader").fadeOut(1000, function () {
                            $(this).remove();
                            if (sets.caption) {
                                $this.append($("<div />").addClass("imgCaption").html(title).hide());
                                captiond = $this.find(".imgCaption");
                                captionh = captiond.innerHeight();
                                captiond.css({
                                    top: -captionh + "px",
                                    position: "absolute",
                                    zIndex: "7"
                                }).show().animate({
                                    top: 0
                                })
                            }
                            sets.onMapLoad.call(this)
                        })
                    }).attr("src", src);
                    image.removeAttr("alt")
                },
                mouse: function (e) {
                    var x = e.pageX,
                        y = e.pageY;
                    return {
                        x: x,
                        y: y
                    }
                },
                update: function (e) {
                    var mouse = map.mouse(e),
                        x = mouse.x,
                        y = mouse.y,
                        movex = x - mx,
                        movey = y - my,
                        top = ey + movey,
                        left = ex + movex,
                        check = map.check(left, top);
                    content.css({
                        top: check.y + "px",
                        left: check.x + "px"
                    });
                    if (sets.cookies) {
                        cookies.create("position", check.x + "," + check.y, 7)
                    }
                },
                navigation: {
                    buttons: function () {
                        $this.prepend($("<div />").addClass("mapNav").css({
                            position: "absolute",
                            zIndex: "7",
                            left: "20px",
                            bottom: "20px"
                        }));
                        nav = $this.find(".mapNav");
                        for (i = 0; i < 4; i++) {
                            nav.append('<a href="#" class="' + sets.navBtnClass + " " + sets.navBtnClass + i + '" rel="' + i + '">btn' + i + "</a>")
                        }
                        nav.bind({
                            mouseenter: function () {
                                if (sets.caption) {
                                    captiond.stop()
                                }
                            }
                        })
                    },
                    move: function () {
                        $("." + sets.navBtnClass).bind({
                            mousedown: function () {
                                var navbtn = $(this).attr("rel");
                                if (navbtn == 0) {
                                    content.animate({
                                        top: 0
                                    }, sets.navSpeed)
                                }
                                if (navbtn == 1) {
                                    content.animate({
                                        left: divw - imgw + "px"
                                    }, sets.navSpeed)
                                }
                                if (navbtn == 2) {
                                    content.animate({
                                        top: divh - imgh + "px"
                                    }, sets.navSpeed)
                                }
                                if (navbtn == 3) {
                                    content.animate({
                                        left: 0
                                    }, sets.navSpeed)
                                }
                            },
                            mouseup: function () {
                                content.stop();
                                var pos = content.position(),
                                    x = pos.left,
                                    y = pos.top;
                                if (sets.cookies) {
                                    cookies.create("position", x + "," + y, 7)
                                }
                            },
                            mouseout: function () {
                                content.stop()
                            },
                            click: function () {
                                return false
                            }
                        })
                    }
                }
            };
            
            if (sets.navigation) {
                map.navigation.buttons();
                map.navigation.move()
            }
            content.bind({
                mousedown: function (e) {
                    e.preventDefault();
                    mouseDown = true;
                    var mouse = map.mouse(e);
                    mx = mouse.x, my = mouse.y;
                    var element = content.position();
                    ex = element.left, ey = element.top;
                    map.update(e)
                },
                mousemove: function (e) {
                    if (mouseDown) {
                        map.update(e)
                    }
                    return false
                },
                mouseup: function () {
                    if (mouseDown) {
                        mouseDown = false
                    }
                    return false
                },
                mouseout: function () {
                    if (mouseDown) {
                        mouseDown = false
                    }
                    return false
                },
                mouseenter: function () {
                    if (sets.caption) {
                        captiond.animate({
                            top: -captionh + "px"
                        })
                    }
                    return false
                },
                mouseleave: function () {
                    if (sets.caption) {
                        captiond.animate({
                            top: 0
                        })
                    }
                    return false
                }
            });
            map.init(sets.position);
            
            point.each(function () {
                var $this = $(this),
                    pos = $this.attr("rel").split("-");
                	x = pos[1], y = pos[2];
                
                $this.css({
                    position: "absolute",
                    zIndex: "2",
                    top: y + "px",
                    left: x + "px"
                })
                
                $this.wrapInner($("<div />").addClass("markerContent").css({ display: "none" }));
                
                if ($this.attr('data-type')	== 'image') {
                	prepend = '<img src="/img/map/'+$this.attr('data-prefix')+$this.attr('id')+'.png" alt="'+$this.attr('id')+'" />';
                	$this.prepend(prepend);
                }
            });
            
            
            point.click(function () {
                var $this = $(this),
                    pointw = $this.width(),
                    pointh = $this.height(),
                    pos = $this.position(),
                    py = pos.top,
                    px = pos.left,
                    wrap = $this.find(".markerContent").html();
                    
                $('.point').removeClass('selected');
                $this.addClass('selected');
                
                if (sets.setCenter) {
                    var center_y = -py + divh / 2 - pointh / 2,
                        center_x = -px + divw / 2 - pointw / 2,
                        center = map.check(center_x, center_y);
                    content.animate({
                        top: center.y + "px",
                        left: center.x + "px"
                    })
                }
                
                if ( sets.popup == 'bubble' ) 
                {
                    $("." + sets.popupClass).remove();
                    $this.after($("<div />").addClass(sets.popupClass).css({
                        position: "absolute",
                        zIndex: "3"
                    }).html(wrap).append($("<a />").addClass("close")));
                    var popup = $this.next("." + sets.popupClass),
                        popupw = popup.innerWidth(),
                        popuph = popup.innerHeight(),
                        y = py,
                        x = px;
                    popup.css({
                        top: y + pointh + "px",
                        left: x + "px",
                        marginLeft: -(popupw / 2 - pointw / 2) + "px"
                    })
                } 
                else if ( sets.popup == 'slide' )
                {
                	$("."+sets.popupClass).remove();
                	$slide = $("<div />").addClass(sets.popupClass).html(wrap).append($('<a />').addClass('close'));
                	$('.map').prepend($slide);
                	$slide.slideDown();
                }
                else 
                {
                    sets.onMarkerClick.call(this)
                }
                return false
            });
            $this.find(".close").live("click", function () {
                var $this = $(this);
                $('.point').removeClass('selected');
                
                $this.parents("." + sets.popupClass).remove();
                setTimeout(function () {
                    sets.onPopupClose.call(this)
                }, 100);
                return false
            });
            if (sets.outsideButtons) {
                $(sets.outsideButtons).click(function () {
                    var $this = $(this),
                        id = $this.attr("href");
                    div = content.find("." + sets.markerClass).filter(function () {
                        return $(this).attr("id") == id.substring(1);
                    });
                    div.click();
                    div.addClass('selected');
                    
                    return false
                })
            }
        })
    }
}(jQuery));









(function ($) {
    $.fn.supermap_refresh = function (options) {
        
        var sets = $.extend({}, defaults, options);
        
        return this.each( function () 
        {
            var $this = $(this);
            
            var content = $this.find(".imgContent"),
                image = $this.find("img"),
                title = image.attr("alt"),
                point = $this.find("." + sets.markerClass),
                mouseDown = false,
                mx, my, ex, ey, imgw = image.width(),
                imgh = image.height(),
                divw = $this.width(),
                divh = $this.height();
                
            var map = {
                check: function (x, y) {
                    if (y < (divh - imgh)) {
                        y = divh - imgh
                    } else {
                        if (y > 0) {
                            y = 0
                        }
                    }
                    if (x < (divw - imgw)) {
                        x = divw - imgw
                    } else {
                        if (x > 0) {
                            x = 0
                        }
                    }
                    return {
                        x: x,
                        y: y
                    }
                },
                init: function (position) {
                    switch (position) {
                    case "center":
                        var x = (divw - imgw) / 2,
                            y = (divh - imgh) / 2;
                        break;
                    case "top left":
                        var x = 0,
                            y = 0;
                        break;
                    case "top right":
                        var x = divw - imgw,
                            y = 0;
                        break;
                    case "bottom left":
                        var x = 0,
                            y = divh - imgh;
                        break;
                    case "bottom right":
                        var x = divw - imgw,
                            y = divh - imgh;
                        break;
                    default:
                        var new_position = position.split(" "),
                            x = -(new_position[0]),
                            y = -(new_position[1]);
                        if (y < (divh - imgh)) {
                            y = divh - imgh
                        } else {
                            if (y > 0) {
                                y = 0
                            }
                        }
                        if (x < (divw - imgw)) {
                            x = divw - imgw
                        } else {
                            if (x > 0) {
                                x = 0
                            }
                        }
                    }
                    if (sets.cookies) {
                        if (cookies.read("position") != null) {
                            var pos = cookies.read("position").split(","),
                                x = pos[0],
                                y = pos[1]
                        } else {
                            var x = (divw - imgw) / 2,
                                y = (divh - imgh) / 2
                        }
                    }
                    content.css({
                        top: y + "px",
                        left: x + "px"
                    })
                },
                mouse: function (e) {
                    var x = e.pageX,
                        y = e.pageY;
                    return {
                        x: x,
                        y: y
                    }
                },
                update: function (e) {
                    var mouse = map.mouse(e),
                        x = mouse.x,
                        y = mouse.y,
                        movex = x - mx,
                        movey = y - my,
                        top = ey + movey,
                        left = ex + movex,
                        check = map.check(left, top);
                    content.css({
                        top: check.y + "px",
                        left: check.x + "px"
                    });
                    if (sets.cookies) {
                        cookies.create("position", check.x + "," + check.y, 7)
                    }
                },
            };
            
            content.bind({
                mousedown: function (e) {
                    e.preventDefault();
                    mouseDown = true;
                    var mouse = map.mouse(e);
                    mx = mouse.x, my = mouse.y;
                    var element = content.position();
                    ex = element.left, ey = element.top;
                    map.update(e)
                },
                mousemove: function (e) {
                    if (mouseDown) {
                        map.update(e)
                    }
                    return false
                },
                mouseup: function () {
                    if (mouseDown) {
                        mouseDown = false
                    }
                    return false
                },
                mouseout: function () {
                    if (mouseDown) {
                        mouseDown = false
                    }
                    return false
                }
            });
            map.init(sets.position);
            
            point.each(function () {
                var $this = $(this),
                    pos = $this.attr("rel").split("-");
                	x = pos[1], y = pos[2];
                
                $this.css({
                    position: "absolute",
                    zIndex: "2",
                    top: y + "px",
                    left: x + "px"
                })
                
                $this.wrapInner($("<div />").addClass("markerContent").css({ display: "none" }));
                
                if ($this.attr('data-type')	== 'image') {
                	prepend = '<img src="/img/map/'+$this.attr('data-prefix')+$this.attr('id')+'.png" alt="'+$this.attr('id')+'" />';
                	$this.prepend(prepend);
                }
            });
            
            point.click(function () {
                var $this = $(this),
                    pointw = $this.width(),
                    pointh = $this.height(),
                    pos = $this.position(),
                    py = pos.top,
                    px = pos.left,
                    wrap = $this.find(".markerContent").html();
                    
                $('.point').removeClass('selected');
                $this.addClass('selected');
                
                if (sets.setCenter) {
                    var center_y = -py + divh / 2 - pointh / 2,
                        center_x = -px + divw / 2 - pointw / 2,
                        center = map.check(center_x, center_y);
                    content.animate({
                        top: center.y + "px",
                        left: center.x + "px"
                    })
                }
                
                if ( sets.popup == 'bubble' ) 
                {
                    $("." + sets.popupClass).remove();
                    $this.after($("<div />").addClass(sets.popupClass).css({
                        position: "absolute",
                        zIndex: "3"
                    }).html(wrap).append($("<a />").addClass("close")));
                    var popup = $this.next("." + sets.popupClass),
                        popupw = popup.innerWidth(),
                        popuph = popup.innerHeight(),
                        y = py,
                        x = px;
                    popup.css({
                        top: y + pointh + "px",
                        left: x + "px",
                        marginLeft: -(popupw / 2 - pointw / 2) + "px"
                    })
                } 
                else if ( sets.popup == 'slide' )
                {
                	$("."+sets.popupClass).remove();
                	$slide = $("<div />").addClass(sets.popupClass).html(wrap).append($('<a />').addClass('close'));
                	$('.map').prepend($slide);
                	$slide.slideDown();
                }
                else 
                {
                    sets.onMarkerClick.call(this)
                }
                return false
            });
            $this.find(".close").live("click", function () {
                var $this = $(this);
                $('.point').removeClass('selected');
                
                $this.parents("." + sets.popupClass).remove();
                setTimeout(function () {
                    sets.onPopupClose.call(this)
                }, 100);
                return false
            });
            if (sets.outsideButtons) {
                $(sets.outsideButtons).click(function () {
                    var $this = $(this),
                        id = $this.attr("href");
                    div = content.find("." + sets.markerClass).filter(function () {
                        return $(this).attr("id") == id.substring(1);
                    });
                    div.click();
                    div.addClass('selected');
                    
                    return false
                })
            }
        })
    }
}(jQuery));

function map_zoom ( direction )	
{
	map_width = $('#map-bg').width();
	
	map_vars();
		
	if ( direction == 'in' ) {
		map_vars();
		$('#map-bg').width( (map_width += 100) );		
		$('#map-bg').height( map_width * y_ratio );
		
		$('.map-point').each( function () {
			console.log($(this).position());
			console.log( 'pointer: ' + $(this).attr('href') + ' ' + map_get_quadrant($(this).position().left, $(this).position().top) );
			
			$(this).css({ 'top': $(this).position().top + y_step, 'left': $(this).position().left + x_step });
		});
	}
	
	if ( direction == 'out' ) {
		map_vars();
		$('#map-bg').width( (map_width -= 100) );
		$('#map-bg').height( map_width * y_ratio );
		
		$('.map-region img').each( function () {
			width = $(this).width();
			$(this).width( width / x_ratio );
		});
		
		$('.map-point').each( function () {			
			$(this).css({ 'top': $(this).position().top - 48, 'left': $(this).position().left + 29 });
		});
	}
	
	x_offset = parseInt( - ( $('#map-bg').width() - $('#map-bg').width() ) / 2 );	
	y_offset = parseInt( - ( $('#map-bg').height() - $('#map-bg').height() ) / 2 );
		
	$('#map-bg').css('top', y_offset);
	$('#map-bg').css('left', x_offset);	
}


function map_vars ()
{
	x_ratio = $('#map-bg').width() / $('#map-bg').height(); // 1.666
	y_ratio = $('#map-bg').height() / $('#map-bg').width(); // .6
	x_step	= x_ratio * 100;
	y_step	= y_ratio * 100;	
}