$(function(){
	$('.map').supermap({
		position: 'center',
		popupClass: 'bubble',
		markerClass: 'point',
		popup: true,
		cookies: true,
		caption: true,
		setCenter: true,
		navigation: true,
		navSpeed: 1000,
		navBtnClass: 'navBtn',
		outsideButtons: '.map_buttons a',
		onMarkerClick: function(){},
		onPopupClose: function(){},
		onMapLoad: function(){}
	});
});
