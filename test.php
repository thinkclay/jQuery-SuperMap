<!DOCTYPE html>  
<html>  
<head>  
<title>My Page</title> 
<script src="js/jquery.js"></script>
<script type="text/javascript">
	/*
		KLUDGE: iPad/iPhone does not view webkitIsFullScreen method, or any related methods
		According to Apple SDK documentation, document.webkitIsFullScreen is the proper method, but not sure if it is proper for iOS devices
		Currently manually setting document.webkitIsFullScreen = false in order to get the needed page refresh when orientation ($(window).resize()) changes
	*/
	
	$(document).ready( function () {
	
		$('#content').height($(window).height()).width($(window).width());
		var video = document.getElementById('video');
		
		var canrefresh = true;
		document.webkitIsFullScreen = false; // Manually setting this for needed refresh
		
		/* video.addEventListener("webkitfullscreenchange") breaks ipad/iphone scrolling
		video.addEventListener("webkitfullscreenchange",function(){
			// Detects if video is in full screen mode and toggles canrefresh variable
			// canrefresh = false when webkitfullscreenchange event is heard
			// canrefresh = true after exiting full screen
			if (canrefresh == true) {
				canrefresh = false;
			} else {
				canrefresh = true;
			}
			
			//console.log(document.webkitIsFullScreen+' | '+canrefresh);
			$('body .test').text(document.webkitIsFullScreen+' | '+canrefresh);
		}, false);
		*/
		
		
		$(window).resize(function() {
			// Look to make sure not in full screen, and canrefresh variable is true before refreshing page
			if((document.webkitIsFullScreen == false) && (canrefresh == true)){
				window.location = window.location.href+'?v='+Math.floor(Math.random()*1000);
				$('#content').height($(window).height()).width($(window).width());
			}
		});
		/*
		console.log(document.webkitIsFullScreen+' | '+canrefresh);
		$('body .test').text(document.webkitIsFullScreen+' | '+canrefresh);
		*/
	});
	</script>
</head>  
<body>
<video id="video" controls><source src="vid/boating.webm" type='video/webm; codecs="vp8, vorbis"'><source src="vid/boating.ogv" type='video/ogg; codecs="theora, vorbis"'><source src="vid/boating_mobile.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'><object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab"><param name="src" value="vid/boating_mobile.mp4"><param name="auto play" value="true"><param name="type" value="video/quicktime"><embed src="vid/boating_mobile.mp4"  autoplay="true" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></object></video>

<span class="test"></span>
</body>  
</html>