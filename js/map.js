function map_vars ()
{
	x_ratio = $('#map-bg').width() / $('#map-bg').height(); // 1.666
	y_ratio = $('#map-bg').height() / $('#map-bg').width(); // .6
	x_step	= x_ratio * map.zoom.step;
	y_step	= y_ratio * map.zoom.step;	
}

function map_get_quadrant (x, y)
{
	map_x = $('#map-bg').width() / 2;
	map_y = $('#map-bg').height() / 2;
	
	console.log ( 'Origin:  ('+map_x+', '+map_y+')' );
	console.log ( 'Plotted: ('+x+', '+y+')' );
	
	if ( x >= map_x && y <= map_y )
		return 'q1';
	
	if ( x >= map_x && y >= map_y )
		return 'q2';
		
	if ( x <= map_x && y <= map_y )
		return 'q3';
		
	if ( x <= map_x && y >= map_y )
		return 'q4';
}

function map_zoom ( direction )	
{
	map_width = $('#map-bg').width();
	
	map_vars();
		
	if ( direction == 'in' ) {
		map_vars();
		$('#map-bg').width( (map_width += map.zoom.step) );		
		$('#map-bg').height( map_width * y_ratio );
		
		$('.map-point').each( function () {
			console.log($(this).position());
			console.log( 'pointer: ' + $(this).attr('href') + ' ' + map_get_quadrant($(this).position().left, $(this).position().top) );
			
			$(this).css({ 'top': $(this).position().top + y_step, 'left': $(this).position().left + x_step });
		});
	}
	
	if ( direction == 'out' ) {
		map_vars();
		$('#map-bg').width( (map_width -= map.zoom.step) );
		$('#map-bg').height( map_width * y_ratio );
		
		$('.map-region img').each( function () {
			width = $(this).width();
			$(this).width( width / x_ratio );
		});
		
		$('.map-point').each( function () {			
			$(this).css({ 'top': $(this).position().top - 48, 'left': $(this).position().left + 29 });
		});
	}
	
	x_offset = parseInt( - ( $('#map-bg').width() - $(map.id).width() ) / 2 );	
	y_offset = parseInt( - ( $('#map-bg').height() - $(map.id).height() ) / 2 );
		
	$('#map-bg').css('top', y_offset);
	$('#map-bg').css('left', x_offset);	
}

function map_move ()
{
	animating = false;
			
	$('#map-container').mousemove( function (e) {
		if ( e.clientX < 50 ) {
			if ( animating === false ) {
				animating = true;
				$('#map-interactive').stop().animate({'left':'+=100px'}, 1000, function () { animating = false; });
			}
		}
			
		if ( e.clientX > ($(map.id).width()) ) {
			if ( animating === false ) {
				animating = true;
				$('#map-interactive').stop().animate({'left':'-=100px'}, 1000, function () { animating = false; });
			}
		}
			
		if ( e.clientY < 20 ) {
			if ( animating === false ) {
				animating = true;
				$('#map-interactive').stop().animate({'top':'+=100px'}, 1000, function () { animating = false; });
			}
		}
			
		if ( e.clientY > ($(map.id).height() - 20) ) {
			if ( animating === false ) {
				animating = true;
				$('#map-interactive').stop().animate({'top':'-=100px'}, 1000, function () { animating = false; });
			}
		}
	});
}


function map_points ()
{
	// Append the points to the map
	for ( i=0; i<map.points.length; i++ ) {
		$('#map-interactive').append('<a href="#'+map.points[i].data+'" style="top: '+map.points[i].coordinates[1]+'px; left: '+map.points[i].coordinates[0]+'px;" class="map-point">'+(i+0)+'</a>');
	}
}
