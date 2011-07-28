<!doctype html>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="css/map.css" />
		<link rel="stylesheet" type="text/css" href="css/sunny/jquery-ui-1.8.14.custom.css" />
		
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.14/jquery-ui.min.js"></script>
		<script type="text/javascript" src="/js/map.js"></script>
		<script type="text/javascript">
		var map = {
			id:				'#map-container',					// The actual HTML ID of the map canvas object
			max_height:		1200,
			max_width:		1600,
			zoom:			{ step: 100 },
			
			points:			[
								{ 
									name: 			'Quadrant 1',	// Used in tooltip and modal window
									coordinates: 	[ 100, 100 ],	// [ x, y ]  
									data:			'tree-nymphs',	// Point to the data object id.. makes it relational
									quadrant:		1,
								}, 
								{ 
									name: 			'Quadrant 2',	// Used in tooltip and modal window
									coordinates: 	[ 800, 100 ],	// [ x, y ]  
									data:			'tree-nymphs',	// Point to the data object id.. makes it relational
									quadrant:		2,
								}, 
								{ 
									name: 			'Quadrant 3', 
									coordinates: 	[ 300, 500 ],
									data:		 	'soccer-field',
									quadrant:		3
								},
								{ 
									name: 			'Quadrant 4', 
									coordinates: 	[ 800, 500 ],
									data:		 	'soccer-field',
									quadrant:		4,
								},
							],
			data:			[
								{
									id:				'tree-nymphs',
									description: 	'<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
									gallery:		['img/gallery/tree-nymph-1.jpg']
								},
								{
									id:				'soccer-field',
									description: 	'<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
									gallery:		['img/gallery/soccer-field-1.jpg']
								}
							]
							
		}
						
		$(document).ready( function () {			
			map_zoom('center');
			
			// Append the Data Objects to the map and keep them hidden
			for ( i=0; i<map.data.length; i++ ) {
				$('#map-container').append('<div id="'+map.data[i].id+'" class="map-data"><div class="map-gallery"><img src="'+map.data[i].gallery[0]+'" /></div><div class="map-description">'+map.data[i].description+'</div><a href="#" class="close"><span class="ui-icon ui-icon-close"></span><strong>close</strong></a></div><!-- end: .data -->');
			}
			
			map_points();
			
			$('.close').click( function () {
				$(this).parent().slideUp();
			});
			
			$('.map-point, .map-region').click( function () {
				map_data = $(this).attr('href');
				$(map_data).slideDown();
				return false;
			});
						
			$('#map-zoom-in').click( function () {
//				if ( $('#map-bg').width() < map.max_width )
					map_zoom('in');
			});
			
			$('#map-zoom-out').click( function () {
//				if ( $('#map-bg').width() > map.base_width )
					map_zoom('out');
			});
		});
		</script>
	</head>
	<body>
		<div id="map-container">
			<ul id="map-zoom">
				<li><a href="#" id="map-zoom-in" title="zoom in"><img src="/img/zoom-in.png" alt="Zoom In" /></a></li>
				<li><a href="#" id="map-zoom-out"><img src="/img/zoom-out.png" alt="Zoom Out" /></a></li>	
			</ul>
			
			<div id="map-interactive">				
				<!-- we have to explicitely define the width ad height to make it work in all browsers -->
				<img id="map-bg" src="/img/map/background.jpg" height="1200" width="2000" alt="map" />
			</div>
		</div>
	</body>
</html>