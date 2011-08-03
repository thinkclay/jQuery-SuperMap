/**
 * Jquery SuperMap
 * 
 * @author 		Clay McIlrath
 * @license		http://www.opensource.org/licenses/mit-license.php
 */
(function ($) {
    $.fn.supermap = function (options) 
    {
        var defaults = {
        	zoom:			{ start: .5, increment: .1, max: 1, min: .1 },
            position: 		'center',
            popupClass: 	'bubble',
            markerClass: 	'point',
            popup: 			'bubble',		// slide or bubble
            cookies: 		true,
            caption: 		true,
            setCenter: 		true,
            navigation: 	true,
            moveSpeed: 		1000,
            moveClass: 		'map-move',
            outsideButtons: false,
            onMarkerClick: 	function () {},
            onPopupClose: 	function () {},
            onMapLoad: 		function () {}
        };
        
        var sets = $.extend({}, defaults, options);
        
        return this.each( function () 
        {
            var $this = $(this);
            $this.css({ position: 'relative', overflow: 'hidden', cursor: 'move' });
            $this.wrapInner($('<div />').addClass('imgContent').css({ zIndex: "1", position: "absolute" }));
            
            var content = $(".imgContent"),
                image = $('#map-bg'),
                title = image.attr("alt"),
                point = $this.find("."+sets.markerClass),
                mouseDown = false,
                mx, my, ex, ey, imgw = image.width(),
                imgh = image.height(),
                imgw = image.width(),
                divw = $this.width(),
                divh = $this.height(),
                x_ratio = $('#map-bg').width() / $('#map-bg').height(),
				y_ratio = $('#map-bg').height() / $('#map-bg').width(),
				zoom = sets.zoom.start;
              
            var cookies = {
                create: function (name, value, days) {
                    if (days) {
                        var date = new Date();
                        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                        var expires = "; expires=" + date.toGMTString()
                    } 
                    else {
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
            }
            
            var map = {
                check: function (x, y) {
                    if (y < (divh - imgh))	y = divh - imgh
                    else if (y > 0)	y = 0
                    
                    if (x < (divw - imgw))	x = divw - imgw
                    else if (x > 0)	x = 0
                    
                    return { x: x, y: y }
                },
                
                init: function (position) {
                    map.preloader();
                    map.zoom(null, (imgw * sets.zoom.start), true);
                    
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
                        	} 
                        	else {
                            	if (y > 0) y = 0
                        	}

	                        if (x < (divw - imgw)) {
    	                        x = divw - imgw
	                        } 
	                        else {
	                            if (x > 0) x = 0
	                        }
                    }
                    
                    if (sets.cookies) {
                        if (cookies.read('position') != null) {
                            var pos = cookies.read('position').split(','),
                                x = pos[0],
                                y = pos[1]
                        } 
                        else {
                            var x = (divw - imgw) / 2,
                                y = (divh - imgh) / 2
                        }
                    }
                    
                    content.css({ top: y+'px', left: x+'px' });
                },
                
                preloader: function () {
                    var loadimg = new Image(),
                        src = image.attr('src');
                    
                    image.css({ visibility: 'hidden' });
                    
                    $this.append(
                    	$('<div />').addClass('loader').css({
                    		position:	'absolute',
	                        zIndex: 	'10',
	                        top:		'0',
	                        left: 		'0',
	                        width: 		'100%',
	                        height: 	'100%',
                		})
                    );
                    
                    $(loadimg).load(function () {
                        image.css({ visibility: 'visible' });
                        
                        $this.find(".loader").fadeOut(1000, function () {
                            $(this).remove();
                            
                            if (sets.caption) 
                            {
                                $this.append($("<div />").addClass("imgCaption").html(title).hide());
                                captiond = $this.find(".imgCaption");
                                captionh = captiond.innerHeight();
                                captiond.css({ top: -captionh + "px", position: "absolute", zIndex: "7" }).show().animate({ top: 0 });
                            }
                            
                            sets.onMapLoad.call(this)
                        });
                    }).attr("src", src);
                    
                    image.removeAttr("alt")
                },
                
                mouse: function (e) {
                    var x = e.pageX, y = e.pageY;
                    return { x: x, y: y }
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
                    
                    content.css({ top: check.y+'px', left: check.x+'px' });

                    if (sets.cookies)
                        cookies.create('position', check.x + ',' + check.y, 7)
                },
                
                navigation: {
                    buttons: function () {
                        $this.prepend(
                        	$("<div />").addClass("mapNav").css({
	                            position:	'absolute',
	                            zIndex:		'7',
	                            left:		'20px',
	                            bottom:		'20px'
                        	})
                        );
                        
                        nav = $this.find(".mapNav");
                        
                        for (i = 0; i < 4; i++)
							nav.append('<a href="#" class="' + sets.moveClass + " " + sets.moveClass + i + '" rel="' + i + '">btn' + i + "</a>")
                        
                        nav.bind({
                            mouseenter: function () {
                                if (sets.caption)
                                    captiond.stop()
                            }
                        });
                    },
                    
                    move: function () {
                        $("." + sets.moveClass).bind({
                            mousedown: function () {
                                var move = $(this).attr("rel");
                                
                                if (move == 0) 
                                    content.animate({ top: 0 }, sets.moveSpeed)

                                if (move == 1) 
                                	content.animate({ left: divw - imgw + 'px' }, sets.moveSpeed)
                                
                                if (move == 2) 
                                    content.animate({ top: divh - imgh + 'px' }, sets.moveSpeed)
                                    
                                if (move == 3) 
                                    content.animate({ left: 0 }, sets.moveSpeed) 
                            },
                            mouseup: function () {
                                content.stop();
                                
                                var pos = content.position(),
                                    x = pos.left,
                                    y = pos.top;
                                    
                                if (sets.cookies)
                                    cookies.create("position", x + "," + y, 7)
                            },
                            mouseout: function () { content.stop(); },
                            click: function () { return false; } })
                    }
                },
                
				plot: function (direction, start) {
					point.each( function () {
		                var $this = $(this);
		                
		                console.log('Ratio: '+ratioWidth+','+ratioHeight);
		                
		                if ( start === true ) {
		                	pos = $this.attr("rel").split("-");
		                	x = (pos[1] * ratioWidth), y = (pos[2] * ratioHeight);
		                	
		                	$this.wrapInner($('<div />').addClass('markerContent').css({ display: 'none' }));
		                
			                if ($this.attr('data-type')	== 'image') {
			                	prepend = '<img src="/img/map/'+$this.attr('data-prefix')+$this.attr('id')+'.png" alt="'+$this.attr('id')+'" />';
			                	$this.prepend(prepend);
			                }
			                
			                $this.width( Math.round($this.width() / ratioWidth) );
			                $this.children('img').width( $this.width() );
		                }
		                else {
		                	x = $this.position().left, 
		                	y = $this.position().top;
		                
							console.log(x+', '+y);
							
							if ( direction == 'in' ) {
								y = Math.round(y * ratioHeight);
								x = Math.round(x * ratioWidth);
								
								$this.width( Math.round($this.width() * ratioWidth) );
								$this.children('img').width( $this.parent().width() );
							}
								
							if ( direction == 'out' ) {
								y = Math.round(y / ratioHeight);
								x = Math.round(x / ratioWidth);
								
								$this.width( Math.round($this.width() / ratioWidth) );
								$this.children('img').width( $this.parent().width() );
							}
							
							console.log(x+', '+y);
						}
							
		                $this.css({ position: 'absolute', zIndex: '2', top: y+'px', left: x+'px' });
		            });
				},
				
				zoom: function ( direction, w, start ) {
					map_width = $('#map-bg').width();
                	max = (zoom >= sets.zoom.max && direction == 'in' );
                	min = (zoom <= sets.zoom.min && direction == 'out');
                	
                	if ( min || max )
                		return false;
					
					if ( direction == 'in' ) {
						zoom += sets.zoom.increment;
						
						$('#map-bg').width( Math.round(map_width += (map_width * sets.zoom.increment)) );		
						$('#map-bg').height( Math.round(map_width * y_ratio) );
					}
					
					if ( direction == 'out' ) {
						zoom -= sets.zoom.increment;
						
						$('#map-bg').width( map_width -= (map_width * sets.zoom.increment) );
						$('#map-bg').height( map_width * y_ratio );
					}	
					
					if ( w != '' && typeof w != 'undefined' ) {
						if ( w < $('#map-bg').width() )	direction = 'out';
							
						if ( w > $('#map-bg').width() )	direction = 'in';
					
						$('#map-bg').width( Math.round(w) );
						$('#map-bg').height( Math.round(w * y_ratio) );
					}
					
					ratioWidth = imgw / $('#map-bg').width();
					ratioHeight = imgh / $('#map-bg').height();
					
					map.plot(direction, start);					
				}
				
            }; // end: map
            
            if (sets.navigation) {
                map.navigation.buttons();
                map.navigation.move();
            }
            
            content.bind({
                mousedown: function (e) 
                {
                    e.preventDefault();
                    mouseDown = true;
                    var mouse = map.mouse(e);
                    mx = mouse.x, my = mouse.y;
                    var element = content.position();
                    ex = element.left, ey = element.top;
                    map.update(e)
                },
                mousemove: function (e) {
                    if (mouseDown)	map.update(e)
                    return false
                },                
                mouseup: function () {
                    if (mouseDown)	mouseDown = false
                    return false
                },
                mouseout: function () {
                    if (mouseDown)	mouseDown = false
                    return false
                },                
                mouseenter: function () {
                    if (sets.caption)	captiond.animate({ top: -captionh + 'px' });
                    return false
                },                
                mouseleave: function () {
                    if (sets.caption)	captiond.animate({ top: 0 });
                    return false
                }
            });
            
            map.init(sets.position);
                        
            point.click( function () {
                var $this = $(this),
                    pointw = $this.width(),
                    pointh = $this.height(),
                    pos = $this.position(),
                    py = pos.top,
                    px = pos.left,
                    wrap = $this.find('.markerContent').html();
                    
                $('.point').removeClass('selected');
                $this.addClass('selected');
                
                if (sets.setCenter) {
                    var center_y = -py + divh / 2 - pointh / 2,
                        center_x = -px + divw / 2 - pointw / 2,
                        center = map.check(center_x, center_y);
                    
                    content.animate({ top: center.y+'px', left: center.x+'px' });
                }
                
                if ( sets.popup == 'bubble' ) {
                    $('.'+sets.popupClass).remove();
                    
                    $this
                    	.after($("<div />").addClass(sets.popupClass).css({ position: "absolute", zIndex: "3" })
                    	.html(wrap).append($("<a />").addClass("close")));
                    
                    var popup = $this.next("." + sets.popupClass),
                        popupw = popup.innerWidth(),
                        popuph = popup.innerHeight(),
                        y = py, x = px;
                        
                    popup.css({
                        top: y + pointh + "px",
                        left: x + "px",
                        marginLeft: -(popupw / 2 - pointw / 2) + "px"
                    });
                } 
                else if ( sets.popup == 'slide' ) {
                	$("."+sets.popupClass).remove();
                	$slide = $("<div />").addClass(sets.popupClass).html(wrap).append($('<a />').addClass('close'));
                	$('.map').prepend($slide);
                	$slide.slideDown();
                }
                else { sets.onMarkerClick.call(this); }
                
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
            } // end: if outsideButtons
            
            if (sets.zoomInButton && sets.zoomOutButton) {
            	$(sets.zoomInButton).click( function () {
            		map.zoom('in');
					return false;
				});
				
	            $(sets.zoomOutButton).click( function () {
	            	map.zoom('out');
					return false;
				});
            } // end: zoomButtons   
        }); // end: each
    } // end: class
}(jQuery));