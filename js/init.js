$(function(){
	$('.map').supermap({
		zoom:			{ start: .5, increment: .1, max: 1, min: .1 },
		position: 		'center',
		popupClass: 	'slide',	// I created styles for 'bubble' and 'slide' here
		markerClass: 	'point',
		popup: 			'slide',	// bubble or slide
		cookies: 		true,
		caption: 		false,
		setCenter: 		true,
		navigation: 	true,
		moveSpeed: 		1000,
		moveClass: 		'map-move',
		outsideButtons: '.map_buttons a',
		zoomInButton:	'#map_zoom #zoom_in',
		zoomOutButton:	'#map_zoom #zoom_out',
		onMarkerClick: 	function () {},	// if popup is blank, set you default behavior here
		onPopupClose: 	function () {},
		onMapLoad: 		function () {}
	});
});