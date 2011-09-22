$(function(){
	//$(window).resize(function() { window.location.reload(); });
	
	if ( $(window).width() < 1024 )
		var z = .8,
			m = 1;
	else 
		var z = .6,
			m = 1;
		
		
	$('.map').supermap({
		zoom:			{ start: z, increment: .1, max: m, min: z },
		position: 		'center',
		popupClass: 	'slide',
		markerClass: 	'point',
		prefix:			'activity-',
		setCenter: 		true,
		outsideButtons: '.map_buttons a, .bubble-select a',
		zoomInButton:	'#map_zoom #zoom_in',
		zoomOutButton:	'#map_zoom #zoom_out',
	});
});