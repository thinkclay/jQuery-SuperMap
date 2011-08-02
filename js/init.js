function map_instance ()
{
	$('.map').supermap({
		position: 		'center',
		popupClass: 	'slide',	// I created styles for 'bubble' and 'slide' here
		markerClass: 	'point',
		popup: 			'slide',
		cookies: 		true,
		caption: 		false,
		setCenter: 		true,
		navigation: 	true,
		navSpeed: 		1000,
		navBtnClass: 	'map-move',
		outsideButtons: '.map_buttons a',
		onMarkerClick: 	function(){},
		onPopupClose: 	function(){},
		onMapLoad: 		function(){}
	});
}

$(function(){
	map_instance();

	$('#map_zoom #zoom_in').click( function () {
		map_zoom('in');
		$('.map').supermap_refresh();
		return false;
	});
	
	$('#map_zoom #zoom_out').click( function () {
		map_zoom('out');
		$('.map').supermap_refresh();
		return false;
	});
/*	
	$('.activity').hover(
		function () {
			if ( ! $(this).hasClass('selected') ) 
				$(this).animate({ 'opacity': .4 }); 
		},
		function () { 
			if ( ! $(this).hasClass('selected') )
				$(this).animate({ 'opacity': 0 }); 
		}
	);
*/
});
