(function ($) {
    $.fn.supermap = function (options) {
        var defaults = {
            zoom: {
                start: .5,
                increment: .1,
                max: 1,
                min: .1
            },
            position: 'center',
            popupClass: 'bubble',
            markerClass: 'point',
            setCenter: true,
            outsideButtons: false,
            onMarkerClick: function () {},
            onPopupClose: function () {},
            onMapLoad: function () {
				mapKeyGo();
			}
        };

        var sets = $.extend({}, defaults, options);

        return this.each(function () {
            var $this = $(this);
            $this.css({ position: 'relative', overflow: 'hidden', cursor: 'move' });
            $this.wrapInner( $('<div />').addClass('imgContent').css({ zIndex: '1', position: 'absolute' }) );

            var content = $('.imgContent'),
                image = $('#map-bg'),
                point = $this.find('.'+sets.markerClass),
                mouseDown = false,
                mouseMove = false,
                mx, my, ex, ey, imgw = image.width(),
                imgh = image.height(),
                imgw = image.width(),
                divw = $this.width(),
                divh = $this.height(),
                x_ratio = $('#map-bg').width() / $('#map-bg').height(),
                y_ratio = $('#map-bg').height() / $('#map-bg').width(),
                zoom = sets.zoom.start;

            var map = {
                check: function (x, y) {
                    if (y < (divh - $('#map-bg').height())) y = divh - $('#map-bg').height();
                    else if (y > 0) y = 0;

                    if (x < (divw - $('#map-bg').width())) x = divw - $('#map-bg').width();
                    else if (x > 0) x = 0;

                    return { x: x, y: y }
                },

                init: function (position) {
                    map.preloader();
                    map.zoom(null, (imgw * sets.zoom.start), true);

                    switch (position) {
                    case 'center':
                        var x = (divw - $('#map-bg')) / 2,
                            y = (divh - $('#map-bg')) / 2;
                        break;

                    case 'top left':
                        var x = 0,
                            y = 0;
                        break;

                    case 'top right':
                        var x = divw - imgw,
                            y = 0;
                        break;

                    case 'bottom left':
                        var x = 0,
                            y = divh - imgh;
                        break;

                    case 'bottom right':
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
                            if (y > 0) y = 0
                        }

                        if (x < (divw - imgw)) {
                            x = divw - imgw
                        } else {
                            if (x > 0) x = 0
                        }
                    }

                    content.css({ 'top': y+'px', 'left': x+'px' });
                },

                preloader: function () {
                    var loadimg = new Image(),
                        src = image.attr('src');

                    image.css({ visibility: 'hidden' });

                    $this.append(
	                    $('<div />').addClass('loader').css({
	                        position: 'absolute',
	                        zIndex: '10',
	                        top: '0',
	                        left: '0',
	                        width: '100%',
	                        height: '100%'
	                    })
	                );

                    $(loadimg).load(function () {
                        image.css({ 'visibility' : 'visible' });
						$('ul.map_buttons').css({ 'visibility' : 'visible' });

                        $this.find('.loader').fadeOut(1000, function () {
                            $(this).remove();
                            sets.onMapLoad.call(this)
                        });
                    }).attr('src', src);

                    image.removeAttr("alt")
                },

                mouse: function (e) {
                    var x = e.pageX,
                        y = e.pageY;
                    return {
                        x : x,
                        y : y
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
                        top : check.y+'px',
                        left : check.x+'px'
                    });
                },

                zoom: function (direction, w, start) {
                    var map_width = $('#map-bg').width(),
						max = (zoom >= sets.zoom.max && direction == 'in'),
                    	min = (zoom <= sets.zoom.min && direction == 'out'),
                    	zoom_in = $(sets.zoomInButton),
                    	zoom_out = $(sets.zoomOutButton),
                    	currW = $('#map-bg').width(),
                    	currH = $('#map-bg').height();

                    if (min) {
                    	zoom_out.addClass('disabled');
                    	return false;
                    }
                    
                    if (max) {
                    	zoom_in.addClass('disabled');
                    	return false;
                    }

                    if (direction == 'in') {
                        zoom += sets.zoom.increment;
						zoom_out.removeClass('disabled');
                        $('#map-bg').width(Math.round(map_width += (map_width * sets.zoom.increment)));
                        $('#map-bg').height(Math.round(map_width * y_ratio));
                    }

                    if (direction == 'out') {
                        zoom -= sets.zoom.increment;
						zoom_in.removeClass('disabled');
                        $('#map-bg').width(map_width -= (map_width * sets.zoom.increment));
                        $('#map-bg').height(map_width * y_ratio);
                    }

                    if (w != '' && typeof w != 'undefined') {
                        if (w < $('#map-bg').width()) direction = 'out';

                        if (w > $('#map-bg').width()) direction = 'in';

                        $('#map-bg').width(Math.round(w));
                        $('#map-bg').height(Math.round(w * y_ratio));
                    }

                    ratioWidth = currW / $('#map-bg').width();
                    ratioHeight = currH / $('#map-bg').height();

                    map.plot(direction, start);
                },

                plot: function (direction, start) {
                    point.each(function () {
                        var $this = $(this);

                        if (start === true) {
                            pos = $this.attr("rel").split("-");
                            x = (pos[1] * ratioWidth), y = (pos[2] * ratioHeight);

                            $this.wrapInner($('<div />').addClass('markerContent').css({
                                display: 'none'
                            }));

                            if ($this.attr('data-type') == 'image') {
                                prepend = '<img src="img/map/'+sets.prefix+$this.attr('id')+'.png" alt="'+$this.attr('id')+'" />';
                                $this.prepend(prepend);
                            }

                            $this.height(Math.round($this.height() / ratioHeight)).width(Math.round($this.width() / ratioWidth));
                            $this.children('img').width($this.width());
                        } else {
                            x = $this.position().left, y = $this.position().top;

                            if (direction == 'in') {
                                y = Math.round(y / ratioHeight);
                                x = Math.round(x / ratioWidth);

                                $this.width(Math.round($this.width() / ratioWidth));
                                $this.height(Math.round($this.height() / ratioHeight));
                                $this.children('img').width($this.width());
                            }

                            if (direction == 'out') {
                                y = Math.round(y / ratioHeight);
                                x = Math.round(x / ratioWidth);

                                $this.width(Math.round($this.width() / ratioWidth));
                                $this.height(Math.round($this.height() / ratioHeight));
                                $this.children('img').width($this.width());

                            }
                        }

                        $this.css({ 'position' : 'absolute', 'zIndex' : '2', 'top' : y+'px', 'left' : x+'px' });
                    });
                }
            }; // end: map
            
            content.bind({
                mousedown: function (e) {
                    e.preventDefault();
                    mouseDown = true;
                    mouseMove = false;
                    var mouse = map.mouse(e);
                    mx = mouse.x, my = mouse.y;
                    var element = content.position();
                    ex = element.left, ey = element.top;
                    map.update(e)
                },
                mousemove: function (e) {
                    mouseMove = true;

                    if (mouseDown) map.update(e)

                    return false
                },
                mouseup: function () {
                    mouseDown = false;
                    return false
                }
            });

            map.init(sets.position);

            point.bind({
            	mouseover: function () {
	                var $this = $(this),
	                    pointw = $this.width(),
	                    pointh = $this.height(),
	                    pos = $this.position(),
	                    popup = $('.bubble'),
	                    py = pos.top,
	                    px = pos.left;
	
	                popup.remove();
	
	                $this.append($("<div />").addClass('bubble'));
	
	                $('.bubble').html($this.find('h1').text()).css({ 'position' : 'absolute', 'zIndex' : '5' }).fadeIn('slow');
	            },
	            
	            mouseout: function () {
					$('.bubble').fadeOut();	
					$('.bubblePerm b').click( function () { $('.bubblePerm').fadeOut().remove(); } );
				},
				
				click: function () {
	                slide = true;
	
	                if (mouseMove) 
	                	return false;
	
					if (typeof autoRotate != 'undefined')
	                    clearInterval(autoRotate);
					
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
	
	                    content.animate({ 'top' : center.y+'px', 'left' : center.x+'px' });
	                }

	                $('.bubble, .bubble-select').remove(); 
	                $('.bubblePerm b').click( function () { $('.bubblePerm').fadeOut().remove(); } );
									
	                $("."+sets.popupClass).remove();
	
	                if ($this.attr('data-multiple')) {
	                    slide = false;
	                    id = $this.attr('data-subs').split(',');
	
	                    html = '<h1>Click to view more</h1>';
	                    for (i = 0; i < id.length; i++) {
	                        html += '<a href="'+id[i]+'" onclick="return false;">'+$(id[i]).find('h1').text()+'</a>';
	                    }
	
	                    $this.after($("<div />").addClass('bubble-select').html(html).append($("<a />").addClass("close")));
	
	                    var popup = $('.bubble-select'),
	                        popupw = popup.innerWidth(),
	                        popuph = popup.innerHeight(),
	                        y = py,
	                        x = px;
	
	                    popup.css({
	                        display: 'block',
	                        top: y + pointh + "px",
	                        left: x + "px",
	                        marginLeft: -(popupw / 2 - pointw / 2) + "px",
	                        position: "absolute",
	                        zIndex: "3"
	                    });
	                }
	
	                if (slide !== false) {
	                    $slide = $("<div />").addClass(sets.popupClass).html(wrap).append($('<a />').addClass('close'));
	                    $('.map').prepend($slide);
	                    $slide.slideDown();
	                }

	                if ($this.attr('data-image')) {
	                    $.ajax({
	                        url: 'ssp.php', 
	                        dataType: 'json',
	                        data: {
	                            url: $this.attr('data-image')
	                        },
	                        success: function (data) {
	                            path = data.gallery.album['@attributes'].lgPath;
	
	                            $slide.prepend('<div id="ssp-i" class="ssp"><div class="inner"></div></div>');
								
								$('body').append('<div id="test" style="width: 500px;"></div>');
														
								for (i = 0; i < data.gallery.album.img.length; i++) {
									$('#ssp-i .inner').append('<img src="'+path+data.gallery.album.img[i]['@attributes'].src+'" />');
	                            }
								
								/** 
								 * Start rotating through the images by:
								 * 
								 * 1: hide all images by default (in css) and then show first image 
								 * 2: hide currently visible image
								 * 3: move current image to end of DOM container
								 * 4: display next image
								 * 5: allow override by next / prev
								 */	
								var current = 1,
									total = $('#ssp-i img').length,
									$sspInner = $('#ssp-i .inner'),
									$controlNext = $('<a href="#" class="ssp-control next" />'),
									$controlPrev = $('<a href="#" class="ssp-control prev" />'),
									$controlPause = $('<a href="#" class="ssp-pause">Pause</a>'),
									$controlPlay = $('<a href="#" class="ssp-play">Play</a>'),
									autoRotate = setInterval( function () {
										$sspInner.find('img:visible').hide().next('img').fadeIn().end().appendTo($sspInner);
						
							        	if (current < total) {
											current++;
											$('.counter span').text(current);
										}
										else {
											current = 1;
											$('.counter span').text(current);
										}
									}, 4000);
									
								$('#ssp-i img:first-child').show().addClass('first');
								
								$('#ssp-i')
									.append($controlPlay, $controlPause, $controlNext, $controlPrev)
									.append('<div class="counter"><span>'+current+'</span> / '+total+'</div>');
								
								$controlPause.bind('click', function(e) {
									clearInterval(autoRotate);
									$controlPause.hide();
									$controlPlay.show();
								});
								
								$controlPlay.bind('click', function(e) {
									autoRotate = setInterval( function () {
										$sspInner.find('img:visible').hide().next('img').fadeIn().end().appendTo($sspInner);
						
							        	if (current < total) {
											current++;
											$('.counter span').text(current);
										}
										else {
											current = 1;
											$('.counter span').text(current);
										}
									}, 4000);
									
									$controlPlay.hide();
									$controlPause.show();
								});
								
								$controlNext.bind('click', function(e) {
									if (typeof autoRotate != 'undefined') {
										clearInterval(autoRotate);
										$controlPause.hide();
										$controlPlay.show();
									}
									
									$sspInner.find('img:visible').hide().next('img').fadeIn().end().appendTo($sspInner);
						
						        	if (current < total) {
										current++;
										$('.counter span').text(current);
									}
									else {
										current = 1;
										$('.counter span').text(current);
									}
									
									return false;
								});
								
								$controlPrev.bind('click', function(e) {
									if (typeof autoRotate != 'undefined') {
										clearInterval(autoRotate);
										$controlPause.hide();
										$controlPlay.show();
									}
									
									if (current > 1) {
										current--;
										$('.counter span').text(current);
									}
									else {
										current = total;
										$('.counter span').text(current);
									}
										
									$sspInner.find('img:visible').hide();
	                                $sspInner.find('img:last-child').prependTo($sspInner).fadeIn();
									return false; 
								});
	                        }
	                    });
	                }

	                if ($this.attr('data-video')) {
	                    $slide.prepend('<div id="ssp-v" class="ssp"></div>');
	                    $('#ssp-v').append('<video controls><source src="' + $(this).attr('data-video') + '.webm" type=\'video/webm; codecs="vp8, vorbis"\'><source src="' + $(this).attr('data-video') + '.ogv" type=\'video/ogg; codecs="theora, vorbis"\'><source src="' + $(this).attr('data-video') + '.mp4" type=\'video/mp4; codecs="avc1.42E01E, mp4a.40.2"\'><object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab"><param name="src" value="' + $(this).attr('data-video') + '.mp4"><param name="auto play" value="true"><param name="type" value="video/quicktime"><embed src="' + $(this).attr('data-video') + '.mp4 <view-source:' + $(this).attr('data-video') + '.mp4> "  autoplay="true" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></object></video>');
	                }
	
	                if ($this.attr('data-image') && $this.attr('data-video')) {
	                    $('.ssp').hide();
	                    $('#ssp-i').show();
	
	                    $slide.append('<a class="view-ssp-i selected" href="#ssp-i"><img src="img/ui/view-slideshow.png" alt="View Slideshow" border="0" /></a>');
	                    $slide.append('<a class="view-ssp-v" href="#ssp-v"><img src="img/ui/play-video.png" alt="Play Video" border="0" /></a>');
	
	                    $('.slide .view-ssp-i, .slide .view-ssp-v').live('click', function () {
	                        id = $(this).attr('href');
	                        $('.view-ssp-i, .view-ssp-v').removeClass('selected');
	                        $(this).addClass('selected');
	                        $('.ssp').hide();
	                        $(id).fadeIn();
	                        return false;
	                    });
	                }
                    
					if ( $('.description .inner').height() > $('.description').height() ) {
	                   	$slide.prepend('<a href="#" class="read-less">Less</a>');
	                   	$slide.append('<a href="#" class="read-more">More</a>');
					}
					
					// You can change the scroll amount here, as well as the event that triggers scrolling
					$('.read-more').live('click', function () {
						scroll = $('.description').scrollTop();
						$('.description').scrollTop(scroll += 100);
						return false;
					});
					
					$('.read-less').live('click', function () {
						scroll = $('.description').scrollTop();
						$('.description').scrollTop(scroll -= 100);
						return false;
					});
					
					$slide.append('<a id="locate">Locate on Map</a>');
					$('#locate').live('click', function () { 
						$slide.hide();
						$('.selected').removeClass('selected');
						$('#'+$this.attr('id')).addClass('selected');
						$('.bubble, .bubble-select, .bubblePerm').remove();
						$this.append($("<div />").addClass('bubblePerm'));
		
		                $('.bubblePerm').html($this.find('h1').text()).css({
		                    position: 'absolute',
		                    zIndex: '10',
		                }).append(' <b>X</b>').fadeIn('slow');
					});
	
	                sets.onMarkerClick.call(this);
	
	                return false
				}
            });

            $this.find('.close').live('click', function () {
                $('.point').removeClass('selected');
                
                $('#test').empty();
				$(this).parent().empty().remove();  
				              
				if (typeof autoRotate != 'undefined')
					clearInterval(autoRotate);
					
                setTimeout(function () { sets.onPopupClose.call(this) }, 100);

                return false
            });

            if (sets.outsideButtons) {
                $(sets.outsideButtons).live('click', function () {
                    mouseMove = false;
                    
                    if ( typeof autoRotate != 'undefined' )
	                    clearInterval(autoRotate);

                    var $this = $(this),
                        id = $this.attr("href");

                    if (id == '#') return false;

                    $(id).click();

                    return false;
                })
            }

            if (sets.zoomInButton && sets.zoomOutButton) {
                $(sets.zoomInButton).click(function () {
                    map.zoom('in');
                    return false;
                });

                $(sets.zoomOutButton).click(function () {
                    map.zoom('out');
                    return false;
                });
            }
        }); // end: each
		
		/**
		 * Map Key open/close functionality
		 */		
		function mapKeyGo() {
			$('.keyOpenBtn').live('click', function () {
				$('ul.map_buttons li a').not(this).click(function () {
					$('ul.map_buttons').animate({ 'margin-top': '0px' });
					$('ul.map_buttons li.keyBtn a.keyOpenBtn').show();
					$('ul.map_buttons li.keyBtn a.keyCloseBtn').hide();
				});
            
	            $('ul.map_buttons').animate({ 'margin-top': '-372px' });
            	$('.slide').hide();
				$('.bubble-select').remove();
    	        $(this).toggle();
            
	            $('ul.map_buttons li.keyBtn a.keyCloseBtn').toggle();
        	}, 
        	function () {
				$('ul.map_buttons').animate({ 'margin-top': '0px' });
				$('ul.map_buttons li.keyBtn a.keyOpenBtn').toggle();
				$('ul.map_buttons li.keyBtn a.keyCloseBtn').toggle();
       		});	
		}		
		
    } // end: class
}(jQuery));