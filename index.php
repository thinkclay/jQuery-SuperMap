<?php
$gmaps['api_key'] = 'ABQIAAAAwmk79AvnJv7DeM_KAp3FoBQ172jdTM-1YzwjqzXMH-kwkRyNvBT1c7-p7pu0eDShgeMXLsar2xflVw';
?>
<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
	<style type="text/css">
  	html { height: 100% }
  	body { height: 100%; margin: 0; padding: 0 }
  	#map_canvas { height: 100% }
	</style>
	
	<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
	<script type="text/javascript">
	// Normalizes the coords that tiles repeat across the x axis (horizontally) like the standard Google map tiles.
  	function getNormalizedCoord(coord, zoom) 
  	{
    	var y = coord.y;
    	var x = coord.x;
		
		console.log(x+', '+y);
		 
 		if ( y = 0 ) 
 			return x + y + 2;
 			
 		if ( y = 1 )
 			return x + y + 1;
 			
 		if ( y = 2 )
 			return x + y;
  	}
	
	
	function CoordMapType() {}
	CoordMapType.prototype.tileSize = new google.maps.Size(200,200);
	CoordMapType.prototype.maxZoom = 19;

	CoordMapType.prototype.getTile = function(coord, zoom, ownerDocument) 
	{
  		var div = ownerDocument.createElement('DIV');
		div.innerHTML = coord;
		div.style.width = this.tileSize.width + 'px';
		div.style.height = this.tileSize.height + 'px';
		div.style.fontSize = '10';
		div.style.borderStyle = 'solid';
		div.style.borderWidth = '1px';
		div.style.borderColor = '#888888';
		return div;
	};

	CoordMapType.prototype.name = "Show Tiles";
	CoordMapType.prototype.alt = "Tile Coordinate Map Type";

	var map;
	var coordinateMapType = new CoordMapType();

	
	var illustratedTypeOptions = 
	{
    	getTileUrl: function(coord, zoom) {
    		console.log(getNormalizedCoord(coord, zoom));
    		
	        var bound = Math.pow(2, zoom);
        	return "/img/map/tiles/zoom/"+zoom+"/coord("+ coord.x + ","+coord.y+").jpg";
    	},
    	tileSize: new google.maps.Size(200, 200),
    	isPng: false,
    	maxZoom: 5,
    	minZoom: 0,
    	name: "Illustrated"
  	};
  	var illustratedMapType = new google.maps.ImageMapType(illustratedTypeOptions);
  
	function initialize() 
	{
		var myLatlng = new google.maps.LatLng(0, 0);
    	var myOptions = 
    	{
      		center: myLatlng,
      		zoom: 1,
      		maxZoom: 5,
      		minZoom: 1,
      		mapTypeControlOptions: {
        		mapTypeIds: ['moon', 'coordinate'],
        		style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
      		},
    	};
 
    	var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
     
    	// Now attach the coordinate map type to the map's registry
  		map.mapTypes.set('coordinate', coordinateMapType);
    	map.mapTypes.set('illustrated', illustratedMapType);
    	map.setMapTypeId('illustrated');
	}
	</script> 
</head>
<body onload="initialize()">
	<div id="map_canvas" style="width:100%; height:100%"></div>
</body>
</html>