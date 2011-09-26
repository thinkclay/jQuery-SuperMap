$(function(){
	$('.map').supermap({
		zoom:			{ start: .5, increment: .1, max: 1, min: .5 },
		position: 		'center',
		popupClass: 	'slide',		// I created styles for 'bubble' and 'slide' here
		markerClass: 	'point',
		prefix:			'activity-',	// image prefix
		setCenter: 		true,
		outsideButtons: '.map_buttons a, .bubble-select a',
		zoomInButton:	'#map_zoom #zoom_in',
		zoomOutButton:	'#map_zoom #zoom_out'
	});
});