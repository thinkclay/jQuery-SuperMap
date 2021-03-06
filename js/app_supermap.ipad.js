(function($) {
    $.fn.supermap = function(options) {
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
            onMarkerClick: function() {},
            onPopupClose: function() {},
            onMapLoad: function() {
                mapKeyGo();
            }
        };

        var sets = $.extend({}, defaults, options);

        return this.each(function() {
            var $this = $(this);
            $this.css({
                position: 'relative',
                overflow: 'hidden',
                cursor: 'move'
            });
            $this.wrapInner($('<div />').addClass('imgContent').css({
                zIndex: "1",
                position: "absolute"
            }));

            var content = $(".imgContent"),
                image = $('#map-bg'),
                point = $this.find("." + sets.markerClass),
                mouseDown = false,
                mouseMove = false,
                mouseCoordinates = false,
                mx, my, ex, ey, imgw = image.width(),
                imgh = image.height(),
                imgw = image.width(),
                divw = $this.width(),
                divh = $this.height(),
                x_ratio = $('#map-bg').width() / $('#map-bg').height(),
                y_ratio = $('#map-bg').height() / $('#map-bg').width(),
                zoom = sets.zoom.start;

            var map = {
                check: function(x, y) {
                    if (y < (divh - $('#map-bg').height())) y = divh - $('#map-bg').height();
                    else if (y > 0) y = 0;

                    if (x < (divw - $('#map-bg').width())) x = divw - $('#map-bg').width();
                    else if (x > 0) x = 0;

                    return {
                        x: x,
                        y: y
                    }
                },

                init: function(position) {
                    map.preloader();
                    map.zoom(null, (imgw * sets.zoom.start), true);

                    switch (position) {
	                    case 'center':
	                        var x = (divw - $('#map-bg').width()) / 2,
	                            y = (divh - $('#map-bg').height()) / 2;
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

                preloader: function() {
                    var loadimg = new Image(),
                        src = image.attr('src');

                    image.css({
                        visibility: 'hidden'
                    });

                    $this.append(
                    $('<div />').addClass('loader').css({
                        position: 'absolute',
                        zIndex: '10',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                    }));

                    $(loadimg).load(function() {
                        image.css({
                            visibility: 'visible'
                        });

                        $this.find(".loader").fadeOut(1000, function() {
                            $(this).remove();

                            sets.onMapLoad.call(this)
                        });
                    }).attr("src", src);

                    image.removeAttr("alt")
                },

                mouse: function(e) {
                    var x = e.pageX,
                        y = e.pageY;
                    return {
                        x: x,
                        y: y
                    }
                },

                update: function(e) {
                    var mouse = map.mouse(e),
                        x = mouse.x,
                        y = mouse.y,
                        movex = x - mx,
                        movey = y - my,
                        top = ey + movey,
                        left = ex + movex,
                        check = map.check(left, top);

                    content.css({
                        top: check.y + 'px',
                        left: check.x + 'px'
                    });
                },

                zoom: function(direction, w, start) {
                    var map_width = $('#map-bg').width(),
                    	map_height = $('#map-bg').height(),
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

                        if (zoom >= sets.zoom.max)
                            zoom_in.addClass('disabled');
                        
                        map.update(mouseCoordinates);
                    }

                    if (direction == 'out') {
                        zoom -= sets.zoom.increment;
                        zoom_in.removeClass('disabled');
                        $('#map-bg').width(map_width -= (map_width * sets.zoom.increment));
                        $('#map-bg').height(map_width * y_ratio);

                        if (zoom <= sets.zoom.min)
                            zoom_out.addClass('disabled');

                        map.update(mouseCoordinates);
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

                plot: function(direction, start) {
                    point.each(function() {
                        var $this = $(this);

                        if (start === true) {
                            var pos = $this.attr("rel").split("-"),
                                x = (pos[1] * 2 * (sets.zoom.start / defaults.zoom.start)),
                                y = (pos[2] * 2 * (sets.zoom.start / defaults.zoom.start));


                            $this.wrapInner($('<div />').addClass('markerContent').css({
                                display: 'none'
                            }));

                            if ($this.attr('data-type') == 'image') {
                                prepend = '<img src="img/map/' + sets.prefix + $this.attr('id') + '.png" />';
                                $this.prepend(prepend);
                            }

                            $this.height(Math.round($this.height() / ratioHeight)).width(Math.round($this.width() / ratioWidth));
                            $this.children('img').width($this.width());
                        } else {
                            var x = $this.position().left,
                                y = $this.position().top;

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

                        $this.css({
                            position: 'absolute',
                            zIndex: '2',
                            top: y + 'px',
                            left: x + 'px'
                        });
                    });
                }
            }; // end: map
            document.ontouchstart = function(e) {
                if (e.touches.length == 1) { // Only deal with one finger
                    var touch = e.touches[0]; // Get the information for finger #1
                    mouseDown = true;
                    mouseMove = false;

                    var mouse = map.mouse(touch);
                    mx = mouse.x, my = mouse.y;

                    var element = content.position();
                    ex = element.left, ey = element.top;
                }
            }

            document.ontouchmove = function(e) {
                if (e.touches.length == 1) { // Only deal with one finger
                    var touch = e.touches[0]; // Get the information for finger #1
                    mouseMove = true;
                    mouseCoordinates = touch;

                    if (mouseDown) map.update(touch);

                    return false
                }
            }

            document.ontouchend = function() {
                mouseDown = false;
                return false;
            }

            map.init(sets.position);

            point.bind({
                mouseover: function() {
                    var $this = $(this),
                        pointw = $this.width(),
                        pointh = $this.height(),
                        pos = $this.position(),
                        popup = $('.bubble'),
                        py = pos.top,
                        px = pos.left;

                    popup.remove();

                    $this.append($("<div />").addClass('bubble'));
                    $('.bubble').html($this.find('h1').text()).css({
                        position: 'absolute',
                        zIndex: '5'
                    }).fadeIn('slow');
                },

                mouseout: function() {
                    $('.bubble').fadeOut();
                },

                click: function() {
                    slide = true;

                    if (mouseMove) return false;

                    if (typeof autoRotate != 'undefined') clearInterval(autoRotate);

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

                        content.animate({
                            top: center.y + 'px',
                            left: center.x + 'px'
                        });
                    }

                    $('.bubble, .bubble-select').remove();

                    $("." + sets.popupClass).remove();

                    if ($this.attr('data-multiple')) {
                        slide = false;
                        id = $this.attr('data-subs').split(',');

                        html = '<h1>Click to view more</h1>';
                        for (i = 0; i < id.length; i++) {
                            html += '<a href="' + id[i] + '" onclick="return false;">' + $(id[i]).find('h1').text() + '</a>';
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
                        $slide = $("<div />").addClass(sets.popupClass).html(wrap).append($('<a class="close"><img src="img/ui/dropdown-close-lg.png"></a>'));
                        $('.map').prepend($slide);
                        $slide.slideDown();
                    }

                    if ($this.attr('data-image')) {
                        $.ajax({
                            url: 'ssp.php',
                            // Brian 0824: relative path if not at domain root level
                            dataType: 'json',
                            data: {
                                url: $this.attr('data-image')
                            },
                            success: function(data) {
                                path = data.gallery.album['@attributes'].lgPath;

                                $slide.prepend('<div id="ssp-i" class="ssp"><div class="inner"></div></div>');

                                for (i = 0; i < data.gallery.album.img.length; i++) {
                                    $('#ssp-i .inner').append('<img src="' + path + data.gallery.album.img[i]['@attributes'].src + '" />');
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
                                    $controlNext = $('<a class="ssp-control next" />'),
                                    $controlPrev = $('<a class="ssp-control prev" />'),
                                    $controlPause = $('<a class="ssp-pause"><img src="img/ui/ssp-pause.png"></a>'),
                                    $controlPlay = $('<a class="ssp-play"><img src="img/ui/ssp-play.png"></a>'),
                                    autoRotate = setInterval(function() {
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
                                    
                                $slide.find('.close').bind('click', function() {
                                	clearInterval(autoRotate);
                                });

                                $('#ssp-i img:first-child').show().addClass('first');

                                $('#ssp-i').append($controlPlay, $controlPause, $controlNext, $controlPrev).append('<div class="counter"><span>' + current + '</span> / ' + total + '</div>');

                                $controlPause.bind('touchstart', function(e) {
                                    clearInterval(autoRotate);
                                    $controlPause.hide();
                                    $controlPlay.show();
                                });

                                $controlPlay.bind('touchstart', function(e) {
                                    autoRotate = setInterval(function() {
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

                                $controlNext.bind('touchstart', function(e) {
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

                                $controlPrev.bind('touchstart', function(e) {
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
                        $('#ssp-v').append('<video id="video" controls><source src="' + $(this).attr('data-video') + '.webm" type=\'video/webm; codecs="vp8, vorbis"\'><source src="' + $(this).attr('data-video') + '.ogv" type=\'video/ogg; codecs="theora, vorbis"\'><source src="' + $(this).attr('data-video') + '_mobile.mp4" type=\'video/mp4; codecs="avc1.42E01E, mp4a.40.2"\'><object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab"><param name="src" value="' + $(this).attr('data-video') + '_mobile.mp4"><param name="auto play" value="true"><param name="type" value="video/quicktime"><embed src="' + $(this).attr('data-video') + '_mobile.mp4 <view-source:' + $(this).attr('data-video') + '.mp4> "  autoplay="true" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></object></video>');
                    }

                    if ($this.attr('data-image') && $this.attr('data-video')) {
                        $('.ssp').hide();
                        $('#ssp-i').show();

                        $slide.append('<a class="view-ssp-i selected" rel="#ssp-i"><img src="img/ui/view-slideshow.png" alt="View Slideshow" border="0" /></a>');
                        $slide.append('<a class="view-ssp-v" rel="#ssp-v"><img src="img/ui/play-video.png" alt="Play Video" border="0" /></a>');

                        $('.slide .view-ssp-i').live('touchstart', function() {

                            id = $(this).attr('rel');
                            $('.view-ssp-i, .view-ssp-v').removeClass('selected');
                            $(this).addClass('selected');
                            $('.ssp').hide();
                            $(id).fadeIn();
                            $('#ssp-v video').get(0).pause();
                            return false;
                            
                            var norefresh = 'false';
                            console.log(norefresh);

                        });

                        $('.slide .view-ssp-v').live('touchstart', function() {

                            id = $(this).attr('rel');
                            $('.view-ssp-i, .view-ssp-v').removeClass('selected');
                            $(this).addClass('selected');
                            $('.ssp').hide();
                            $(id).fadeIn();
                            $('#ssp-v video').get(0).play();
                            return false;
                            
                            var norefresh = 'true';
                            console.log(norefresh);

                        });
                    }

                    if ($('.description .inner').height() > $('.description').height()) {
                        $slide.prepend('<a class="read-less"><img src="img/ui/text-scroll-up.png"></a>');
                        $slide.append('<a class="read-more"><img src="img/ui/text-scroll-down.png"></a>');
                    }

                    // You can change the scroll amount here, as well as the event that triggers scrolling
                    $('.read-more').live('touchstart', function() {
                        scroll = $('.description').scrollTop();
                        $('.description').scrollTop(scroll += 100);
                        return false;
                    });

                    $('.read-less').live('touchstart', function() {
                        scroll = $('.description').scrollTop();
                        $('.description').scrollTop(scroll -= 100);
                        return false;
                    });

                    $slide.append('<a id="locate">Locate on Map</a>');
                    $('#locate').live('touchstart', function() {
                        $slide.hide();
                        $('.selected').removeClass('selected');
                        $('#' + $this.attr('id')).addClass('selected');
                        $('.bubble').remove();
                        $this.append($("<div />").addClass('bubble'));

                        $('.bubble').html($this.find('h1').text()).css({
                            position: 'absolute',
                            zIndex: '5',
                        }).fadeIn('slow');
                    });

                    sets.onMarkerClick.call(this);

                    return false
                }
            });

            $this.find(".close").live('click', function() {
                $('.point').removeClass('selected');
                $(this).parent().remove();
                clearInterval(autoRotate);
                setTimeout(function() {
                    sets.onPopupClose.call(this)
                }, 100);

                return false
            });

            if (sets.outsideButtons) {
                $(sets.outsideButtons).live('click', function() {
                    mouseMove = false;

                    $('ul.map_buttons').animate({
                        'bottom': '-400px'
                    });
                    if (typeof autoRotate != 'undefined') clearInterval(autoRotate);

                    var $this = $(this),
                        id = $this.attr("href");

                    if (id == '#') return false;

                    $(id).click();

                    return false;
                })
            }

            if (sets.zoomInButton && sets.zoomOutButton) {
                $(sets.zoomInButton).bind('touchstart', function(e) {
                    map.zoom('in');
                    return false;
                });

                $(sets.zoomOutButton).bind('touchstart', function(e) {
                    map.zoom('out');
                    return false;
                });
            }
        }); // end: each

        function mapKeyGo() {
            $('.keyBtn a').bind('touchstart', function(e) {
                //$('.keyBtn a').click(function(){
                if ($(this).attr('class') == 'keyOpenBtn') {
                    $('ul.map_buttons li.keyBtn a.keyOpenBtn').hide();
                    $('ul.map_buttons li.keyBtn a.keyCloseBtn').show();
                    $('.slide').hide();
                    $('.bubble-select').remove();
                    $('ul.map_buttons').animate({
                        'bottom': '0px'
                    });
                }
                else {
                    $('ul.map_buttons li.keyBtn a.keyOpenBtn').show();
                    $('ul.map_buttons li.keyBtn a.keyCloseBtn').hide();
                    $('ul.map_buttons').animate({
                        'bottom': '-400px'
                    });
                }
            });
        }
        
        

    } // end: class
}(jQuery));
