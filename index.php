<?php 
if(strstr($_SERVER['HTTP_USER_AGENT'],'iPhone') || strstr($_SERVER['HTTP_USER_AGENT'],'iPod') || strstr($_SERVER['HTTP_USER_AGENT'],'iPad') || strstr($_SERVER['HTTP_USER_AGENT'],'Android')):
	$mobile = '1';
else: 
	$mobile = '0';
endif;
?><!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Coleman Country Day Camp Interactive Map</title>
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js" type="text/javascript"></script>
	<link href="css/reset.css" rel="stylesheet" type="text/css" />
	
<?php if ($mobile=='1'): ?>
 	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	
	<?php if (strpos($_SERVER['HTTP_USER_AGENT'], 'iPad')): ?>
	<link href="css/default.ipad.css" rel="stylesheet" type="text/css" />
	<link href="css/points.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript">
	$(document).ready( function () {
		$('#content').height($(window).height()).width($(window).width());
		
		$(window).resize(function() { 
			window.location = window.location.href+'?v='+Math.floor(Math.random()*1000);
			$('#content').height($(window).height()).width($(window).width()); 
		});
		
	});
	</script>
	<script src="js/supermap.ipad.js" type="text/javascript"></script>
	<script src="js/init.ipad.js" type="text/javascript"></script>
	
	<?php else: ?>
	<link href="css/default.mobile.css" rel="stylesheet" type="text/css" />
	<link href="css/points.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript">
	$(document).ready( function () {
		$('#content').height($(window).height()).width($(window).width());
		
		
		$(window).resize(function() { 
			window.location = window.location.href+'?v='+Math.floor(Math.random()*1000);
			$('#content').height($(window).height()).width($(window).width()); 
		});
		
		
		
	});
	</script>
	<script src="js/supermap.mobile.js" type="text/javascript"></script>
	<script src="js/init.mobile.js" type="text/javascript"></script>
	<?php endif; ?>

<?php else: ?>	
	<link href="css/default.css" rel="stylesheet" type="text/css" />
	<link href="css/points.css" rel="stylesheet" type="text/css" />
	
	<script src="js/supermap.js" type="text/javascript"></script>
	<script src="js/init.js" type="text/javascript"></script>
<?php endif; ?>
</head>

<body>
	<div id="content">
		<div class="map">
			<img id="map-bg" src="map.jpg" alt="Map Title" width="2000" height="1200" />

			<!-- 
			@@@@@@@@@@@@@ Usage @@@@@@@@@@@@@
			class: 			point & activity are required for each of them
			id:				unique ID that can be used from nav elements
			rel:			starting coordinate for the activity (point-left-top)
			data-type:		built this for future flexibilty of specifying points as a marker or image
			data-prefix:	i figured we'd want all map point images to have similar names, so I created a prefix
      data-multiple: if combined spots, this should be true
      data-subs: if combined spots and data-multiple="true", specify related spots by defining spot ID's this way:
      data-subs="#gph, #challenge-course, #arts"
      
      data-video: video path and file name, not including extension, i.e. vid/basketball_courts
			
			e.g.:			'/img/map/' + data-prefix + id + '.png' = /img/map/activity-climbing-wall.png
			@@@@@@@@@@@@@ Usage @@@@@@@@@@@@@
			-->
			

			<!--
				*************************
					Solo/Primary hot-spots
				*************************
			-->
			
			<div class="point activity" id="trails" rel="p-157-12" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=52&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Maverick's Meander <em>(Trails)</em></h1>
				<div class="description">
				<div class="inner">
					<p>This half-mile-long horseback riding and hiking trail winds through our grounds, affording a beautiful country setting and opportunities to explore nature right in the suburbs of Long Island. Named for one of our beloved camp mascots, Labrador retriever "Maverick," this rambling path is loaded with adventurous activities. In his memory, Maverick's Perch, a spacious birdhouse, attracts many birds to the area. Our well-behaved horses just love to take campers on trail rides, and there is always wildlife to spot and trees to learn about. Peaceful walks along the trail are a favorite pastime on The Ranch.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="main-office" rel="p-149-249" data-type="image"<?php /* data-image="http://content.colemancountry.com/ssp/images.php?album=74&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0"*/ ?>>
				<div class="singleimg"><div class="inner"><img src="http://content.colemancountry.com/ssp/albums/album-74/lg/001_TownHall.jpg" alt=""></div></div>
				<h1>Town Hall <em>(main office)</em></h1>
				<div class="description">
				<div class="inner">
					<p>Our main office is home base for the Leadership Team which creates each amazing season, and it is the central gathering point for all operations related to camp. This year-round facility is where we plan for our incredible summers, answer phones, and greet visitors.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="health-center" rel="p-123-258" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=76&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Wounded Knee <em>(health center)</em></h1>
				<div class="description">
				<div class="inner">
					<p>Four R.N.s staff our Health Center, a modern, air-conditioned, well-equipped facility. Campers feel comfortable to stop by, accompanied by a staff member, whether they need meds, a reassuring hug, or simply a place to rest a bit if they are not feeling up to par. The Wounded Knee porch is a welcoming venue, complete with a band-aid and TLC station.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="gate-house" rel="p-116-258" data-type="image"<?php /* data-image="http://content.colemancountry.com/ssp/images.php?album=48&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0"*/ ?>>
				<div class="singleimg"><div class="inner"><img src="http://content.colemancountry.com/ssp/albums/album-48/lg/001_HowdyHouse.jpg" alt=""></div></div>
				<h1>Howdy House <em>(gate house)</em></h1>
				<div class="description">
				<div class="inner">
					<p>Our Gate House is the only point of entry or exit during the summer. This is where parents of campers who haven't taken the bus drop them off and pick them up at the end of the day. Everyone on The Ranch must be known to us and has to sign in if they have a reason to be on The Ranch. Our careful security system helps us protect our campers.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="mini-golf" rel="p-141-232" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=38&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0" data-video="vid/golf">
				<h1>Coleman Country Club <em>(mini golf)</em></h1>
				<div class="description">
				<div class="inner">
					<p>Our very own 9-hole miniature golf course is an inviting focal point on The Ranch, complete with waterfalls, rock formations, and garden sculpture. Each hole suggests a "Dream Big" approach - the underpinning to our philosophy of leaving our comfort zones and taking healthy risks.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="big-top" rel="p-161-191" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=30&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Big Top</h1>
				<div class="description">
				<div class="inner">
					<p>We weren't kidding when we named this venue - a 5,000-square-foot covered area. This amphitheater is vast yet cozy, and acts as both an events space and gathering spot. Whether it's a body-building contest, a game of pickle-ball, or a talent show, this part of camp is always brimming with activity.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="tennis" rel="p-178-161" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=71&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0" data-video="vid/tennis">
				<h1>Tennis Courts</h1>
				<div class="description">
				<div class="inner">
					<p>Four regulation-size outdoor courts with cushioned decking and one Pioneer-size court complete our tennis complex, which also includes four miniature covered courts and an electronic tennis wall. Specialized equipment and talented pros help us teach this life-skill sport to all ages, whether they are perfecting their lob or learning the proper stance with our imprinted footprints for where to stand on the Pioneer court.</p>
					<p>Four regulation-size outdoor courts with cushioned decking and one Pioneer-size court complete our tennis complex, which also includes four miniature covered courts and an electronic tennis wall. Specialized equipment and talented pros help us teach this life-skill sport to all ages, whether they are perfecting their lob or learning the proper stance with our imprinted footprints for where to stand on the Pioneer court.</p>
					<p>Four regulation-size outdoor courts with cushioned decking and one Pioneer-size court complete our tennis complex, which also includes four miniature covered courts and an electronic tennis wall. Specialized equipment and talented pros help us teach this life-skill sport to all ages, whether they are perfecting their lob or learning the proper stance with our imprinted footprints for where to stand on the Pioneer court.</p>
					<p>Four regulation-size outdoor courts with cushioned decking and one Pioneer-size court complete our tennis complex, which also includes four miniature covered courts and an electronic tennis wall. Specialized equipment and talented pros help us teach this life-skill sport to all ages, whether they are perfecting their lob or learning the proper stance with our imprinted footprints for where to stand on the Pioneer court.</p>
					<p>Four regulation-size outdoor courts with cushioned decking and one Pioneer-size court complete our tennis complex, which also includes four miniature covered courts and an electronic tennis wall. Specialized equipment and talented pros help us teach this life-skill sport to all ages, whether they are perfecting their lob or learning the proper stance with our imprinted footprints for where to stand on the Pioneer court.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="playport" rel="p-235-232" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=68&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>"Sol"arium <em>(playport)</em></h1>
				<div class="description">
				<div class="inner">
					<p>Named in honor of Poppy Sol, who designed this "playport," our ball pit is comprised of a series of spaces for jumping, climbing, throwing, and sliding through thousands of soft plastic balls. A second deck features mazes that are pure fun to navigate. One of several playgrounds on The Ranch, this one is a favorite for creative play.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="mega-mesa" rel="p-239-246" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=53&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Mega Mesa</h1>
				<div class="description">
				<div class="inner">
					<p>A multi-story adventure complex that is as colorful as it is creative, this playscape beckons campers to explore its components - from mazes to slides to ladders and more. Our older campers especially love to frolic in this space, a perfect spot for relaxing and laughing!</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="railroad" rel="p-205-261" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=29&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Big Bob Railroad</h1>
				<div class="description">
				<div class="inner">
					<p>A kid-powered mini locomotive, where each child drives his own car around the track. Pure fun is combined with exercise as campers test their strength by creating their own steam!</p>
				</div>
				</div>
			</div>

			
			<div class="point activity" id="field-dreams" rel="p-256-153" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=43&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0" data-video="vid/field-of-dreams">
				<h1>Field of Dreams</h1>
				<div class="description">
				<div class="inner">
					<p>The Fields of Dreams are comprised of four state-of-the-art turf fields and fenced dugouts, all of which are professionally lit for night-time play (the same lighting you'll find at Citi Field). The 40,000 square foot complex also includes giant "water cannons" that are used to "blast" campers  on hot days with gushing water. The fields are also used for Coleman Country's famous tennis-baseball and kickball and are lined for soccer and for Wiffleball. The real stadium seating completes the authentic experience. There's lots of action well after the sun goes down, when different grades are scheduled for extended camp days.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="coleman-yards" rel="p-318-163" data-type="image"<?php /* data-image="http://content.colemancountry.com/ssp/images.php?album=40&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0"*/ ?>>
				<div class="singleimg"><div class="inner"><img src="img/ui/image-placeholder.jpg" alt=""></div></div>
				<h1>Coleman Yards</h1>
				<div class="description">
				<div class="inner">
					<p>This field, dubbed Coleman Yards, has designated single, double, and triple areas (varying according to the age of the campers playing there), and even has a removable home run fence! Wiffleball, while loads of fun in its own right, also serves as baseball cross training (accenting overlapping skills such as eye-hand coordination and base-running). "Water Cannons" which tower above the field provide yet another layer of fun when they are triggered on hot days!</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="crafts" rel="p-193-119" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=44&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Grammy's Gallery <em>(crafts and ceramics)</em></h1>
				<div class="description">
				<div class="inner">
					<p>Named for Grammy Sylvia who developed this extensive program sphere in the creative arts, this complex includes arts and crafts, ceramics, and fine arts. The multi-stationed facility is a core area of activity. Kilns are always firing, crafts are always taking shape, and creativity is always brewing. During "Club Time," there are no fewer than 20 crafts taking place; from jewelry design to scrapbooking to leather-craft. The list goes on and on.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="picnic-grove" rel="p-162-109" data-type="image"<?php /* data-image="http://content.colemancountry.com/ssp/images.php?album=63&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0"*/ ?>>
				<div class="singleimg"><div class="inner"><img src="http://content.colemancountry.com/ssp/albums/album-63/lg/001_PoppysPavilion.JPG" alt=""></div></div>
				<h1>Poppy's Pavilion <em>(Picnic Grove)</em></h1>
				<div class="description">
				<div class="inner">
					<p>An open air, covered picnic grove, this breezy area is used both for outdoor dining as well as for work space for crafts during Club time, when the number of arts and crafts- related activity choices are numerous.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="playground" rel="p-228-141" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=39&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Coleman Mine <em>(Playground)</em></h1>
				<div class="description">
				<div class="inner">
					<p>Styled after a western mine, this playground looks like the real thing and has a series of "buildings" that mimic old-time spaces such as the Cowboy Bunk House and the Logger's Point. Much of the fun takes place on the perimeter, where campers can pan for "gold" among the surrounding pebbles with our "diggers.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="dining-room" rel="p-131-125" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=36&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Chow Hall <em>(Dining Room)</em></h1>
				<div class="description">
				<div class="inner">
					<p>In the true spirit of the Old West, the Chow Hall is the central gathering place for our bountiful and delicious lunches. This cool and air-conditioned comfortable facility contains family-style seating for campers, and buffet serving lines for staff. Alternatives are always available for the pickiest of eaters in our highly nut-aware camp. Special meals are accommodated with ease, from restricted diets to Glatt Kosher meal service.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="gymnastics" rel="p-131-125" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=59&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Pike's Peak (Gymnastics)</h1>
				<div class="description">
				<div class="inner">
					<p>Gymnastics take place in our air-conditioned and magnificent, expansive loft; it is equipped with a full complement of gymnastics equipment and rubber floor matting. Our trained coaches are always "on the spot" in this inspiring setting.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="theater" rel="p-162-109" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=57&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Palace Theater <em>(Movies)</em></h1>
				<div class="description">
				<div class="inner">
					<p>You've seen it on the movie screens of yesterday, but rarely in a camp: we have our very own movie theater. This state-of-the-art, air-conditioned wonder is a great venue for the occasional rainy day, as well as regularly-scheduled multi-media features which helps kids appreciate their own strengths and talents.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="sports-deck" rel="p-162-109" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=67&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Siegel's Sports Deck <em>Soccer</em></h1>
				<div class="description">
				<div class="inner">
					<p>You may think your eyes are deceiving you, but it's true: we have a covered soccer field in the sky! Our 2,500-square-foot, elevated turf soccer field allows play, rain or shine. This incredible field also easily converts to accommodate many other sports. The air is hardly thin in our mile-high arena!</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="woodworking" rel="p-141-103" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=65&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Sawmill <em>(Woodworking)</em></h1>
				<div class="description">
				<div class="inner">
					<p>Fittingly, our woodworking building was built by our own campers, pouring the foundation and fortifying the structure with thousands of nails! The Sawmill is always abuzz with activity. Whether it is the power saw or sandpaper, campers are honing individual skills as well as building community projects such as benches and tables.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="cooking" rel="p-73-150" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=37&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Chuck Wagon &amp; BBQ Blvd <em>(Cooking)</em></h1>
				<div class="description">
				<div class="inner">
					<p>The Chuck Wagon (our traditional kitchen), known as Indoor Cooking, is where we create all kinds of baked goodies, from cookies to pizza to ice cream sundaes. During "Club Time," it is not unusual to see children kneading dough or preparing an elaborate international meal. Chinese cuisine is just one of a long list of Club favorites. Of course, we are very attentive to allergies and specific food requirements.</p>
          <p>Outdoor Cooking, along BBQ Blvd., gives us the opportunity to practice whipping things up on the grill. Whether we are creating S'mores (delectable treats of graham crackers, marshmallows, and chocolate) or inventing a trailside lunch of burgers and beans, campers get to enjoy the feasts they prepare.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="dance-hall" rel="p-51-206" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=54&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Mrs. G's Dance Hall</h1>
				<div class="description">
				<div class="inner">
					<p>Our own Mrs. G., Pioneers' Assistant Supervisor, has loaned her name and her attitude to our dance theater. A mirrored venue, Mrs. G's Dance Hall is a terrific showcase for our campers to learn how to smile and style. Whether they are choreographing steps to a current song or practicing jazz or ballet, our campers excel on the dance floor.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="soccer-fields" rel="p-66-190" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=72&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0" data-video="vid/soccer">
				<h1>The Coliseum <em>(Soccer Fields)</em></h1>

				<div class="description">
				<div class="inner">
					<p>Play like the pros on our state-of-the-art turf soccer fields. Comprised of two full-size soccer fields, this area features space that adapts to the size of the campers who play there. Whatever age, whatever stage, the playing field is conducive to children's stamina and ability. Whether the game takes place length-wise or cross-wise, campers get to experience the game (and the instruction) to its fullest. This field is professionally lit for night action as well!</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="computers" rel="p-61-185" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=31&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Boot Hill <em>(Computers)</em></h1>
				<div class="description">
				<div class="inner">
					<p>Our air-conditioned computer lab houses 20 state-of-the-art computers, and campers have staff available to help them with educational games that have been carefully selected for them. During "Club Time," children have extensive access to the computers as well as to the expert coaching of the computer staff. Supervision is paramount as campers practice navigation skills.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="bus-yard" rel="p-0-135" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=34&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Bus Yard</h1>
				<div class="description">
				<div class="inner">
					<p>This is where our top-flight fleet of modern buses delivers campers at around 9 a.m. and departs for home at 4:30 p.m. Our campers are greeted here each morning by a member of the Leadership Team, and the young ones are escorted to their group. At the end of the day, a carefully orchestrated departure procedure makes everyone feel safe. The little campers are again walked to their vehicles by hand, and each child is checked in by name.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="hockey" rel="p-30-187" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=64&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Rubin's Rink <em>(Hockey Rink)</em></h1>
				<div class="description">
				<div class="inner">
					<p>Our covered arena houses floor hockey, indoor soccer, and other team sports. It offers shade on sunny days and cover during rain. Complete with viewing stands and a penalty box, this professional-style stadium is a focal point of athletic endeavor - a location conducive to instruction and play. You will hear cheering all day long at Rubin's Rink.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="schoolhouse" rel="p-51-206" data-type="image"<?php /* data-image="http://content.colemancountry.com/ssp/images.php?album=50&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0"*/ ?>>
				<div class="singleimg"><div class="inner"><img src="img/ui/image-placeholder.jpg" alt=""></div></div>
				<h1>Little Red Schoolhouse</h1>
				<div class="description">
				<div class="inner">
					<p>We know that some campers benefit from academic continuity during the summer, and so our schoolhouse is staffed with tutors in reading, math, speech, and occupational therapy. If recommended, tutoring is incorporated into the camp day, as we want to ensure that children who could use this remedial work are not precluded from attending camp. Summer School is an idea of the past here in our air-conditioned schoolhouse.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="street-games" rel="p-69-152" data-type="image"<?php /* data-image="http://content.colemancountry.com/ssp/images.php?album=70&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0"*/ ?>>
				<div class="singleimg"><div class="inner"><img src="http://content.colemancountry.com/ssp/albums/album-70/lg/001_StreetGames.JPG" alt=""></div></div>
				<h1>Street Games</h1>
				<div class="description">
				<div class="inner">
					<p>Here in the tented pass-through from the Bus Yard, campers learn old-fashioned "street games" like Boxball, Hopscotch, and Hit the Penny - pastimes reminiscent of a time when kids relied upon their own ingenuity to create relaxing fun for themselves.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="challenge-course" rel="p-59-48" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=35&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Challenge Course</h1>
				<div class="description">
				<div class="inner">
					<p>Macho's Mountain, named for our Challenge Course leader "Macho Man" Scott, includes a 40-foot rock climbing wall as well as a horizontal traverse wall for younger campers. Designed with both high and low ropes elements, the Challenge Course tests individual mettle as well as team spirit. The Fidget Ladder is a favorite for building self-confidence. A signature component - known as "Leap of Faith" - is a true test of the courage we coach in Coleman Country.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="martial-arts" rel="p-42-85" data-type="image"<?php /* data-image="http://content.colemancountry.com/ssp/images.php?album=51&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0"*/ ?>>
				<div class="singleimg"><div class="inner"><img src="http://content.colemancountry.com/ssp/albums/album-51/lg/001_MartialArts.jpg" alt=""></div></div>
				<h1>Martial Arts</h1>
				<div class="description">
				<div class="inner">
					<p>Campers delight in learning basic skills in our martial arts studio. A mini-pavilion inside the Grand Playhouse, the space is conducive to introducing our youngest campers to the skill, and also provides ample room for our older campers to gain self-confidence and focus.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="gph" rel="p-42-85" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=46&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0" data-video="vid/grand-playhouse">
				<h1>Grand Playhouse <em>(GPH)</em></h1>
				<div class="description">
				<div class="inner">
					<p>Our 14,000 square foot multi-sport indoor complex  is  an air-conditioned haven for athletes, adventurists, and thespians alike. It is grand indeed, with 4 volleyball courts, 3 basketball courts, martial arts, rock-climbing wall, and a stage for shows. This vast compound is home to our dramatic performances as well as numerous special events, in which we can seat the entire camp. Of course, in the event of inclement weather, we can move indoors at a moment's notice - never a need to go off-grounds thanks to this and other indoor facilities.  In the winter months, this space is a giant indoor arena for local soccer teams to practice, complete with a turf field that rolls back in the summer.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="horseback-riding" rel="p-432-63" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=55&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>OK Corral <em>(Horseback Riding)</em></h1>
				<div class="description">
				<div class="inner">
					<p>Our horse stable area is a favorite place for Pardners to learn about grooming and riding. Extremely qualified riding staff teach our campers, regardless of age, how to be comfortable around and on horses and ponies. Campers ride, one on one, on our own half-mile trail. Those who have a passion for horses can choose to saddle up during Club, in addition to their regular riding schedule.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="storytelling" rel="p-422-56" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=73&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Tipi <em>(Storytelling)</em></h1>
				<div class="description">
				<div class="inner">
					<p>Our authentic-style tipi is where our Pioneers get to hear Mrs. G's legendary stories. Tall tales are not the only stories told here: our tipi is a great rendezvous place for groups to sit and have a quiet chat, along with their counselors.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="boating" rel="p-222-43" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=47&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0" data-video="vid/boating">
				<h1>Hampton's Pond <em>(Boating)</em></h1>
				<div class="description">
				<div class="inner">
					<p>Named in memory of Coleman Country's first mascot, Labrador retriever Hampton, who just loved to swim there, our pond is an idyllic place to learn how to row, paddle, and frog-hunt! In addition to canoeing and pedal-boating, campers are always eager to secure themselves a place in the Coleman Book of Records by rounding up the biggest frog on Frog Island, which sits in the middle of our two-foot-deep lagoon.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="zipline" rel="p-323-5" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=77&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Zippity Do-Dah <em>(Zipline)</em></h1>
				<div class="description">
				<div class="inner">
					<p>It's not unusual to hear this phrase, along with screeches of delight, as campers "zip" across our 200-foot zip-line. A highlight of our adventures course, the zip-line is a great place to build courage! This area is also equipped with a "Trust Fall," an adventure activity that emboldens children to see that they can count on their friends to support them - literally as well as figuratively!</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="archery" rel="p-411-5" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=32&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Bull's Eye Ridge <em>(Archery)</em></h1>

				<div class="description">
				<div class="inner">
					<p>Our archery facility is tucked away in a quiet corner of the woods, and features multiple targets and a bow to suit every size archer. Taught by counselors who truly love this skill, archery is right on target for fun!</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="music" rel="p-375-59" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=45&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Grand Ol' Music</h1>
				<div class="description">
				<div class="inner">
					<p>Singing and cheering are an important part of camp, and we have the perfect location. Whether it's writing a group song together, learning sign language for the lyrics of "Don't Laugh at Me," joining together for a round of "Popcorn," or belting out a chorus of "Family Tree" or "Siyahamba," our campers love to sing out! Of course, you can always hear strains of "Coleman Country" coming from the Grand Ol' Music Hall.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="gaga-complex" rel="p-364-172" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=42&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0" data-video="vid/dream-dome">
				<h1>Dream Dome <em>(GaGa Complex)</em></h1>
				<div class="description">
				<div class="inner">
					<p>Our GaGa arena is a pavilion that encompasses 3 courts; most notably "The Pit," which has its very own sound system, smoke machine, and lighting network to host each season's highly anticipated GaGa tournament. GaGa, the "gentleman's game" of dodgeball, is all the rage on The Ranch. You could say that campers go GaGa over the elevated complex of courts and eagerly practice all summer in the hopes of seeing their name on the GaGa Wall of Fame while they improve their motor skills and thinking strategies!</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="water-park" rel="p-364-172" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=33&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Bumper Boats/Sand &amp; Water Park</h1>
				<div class="description">
				<div class="inner">
					<p>Our mini water theme park includes both a bumper boat pool as well as a sand and water park. Bumper boats are just a pleasurable way to cool off and have pure fun, while the sand and water park is the perfect spot for creative and cooperative play. Pioneers, our youngest campers, are scheduled for this inventive playtime before their swim, when they are already in their bathing suits.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="ping-pong" rel="p-371-250" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=58&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Pam Pong (Ping Pong)</h1>
				<div class="description">
				<div class="inner">
					<p>Four-sided ping pong, affectionately named for Associate Director Pam Hall, is a haven for relaxed play. There are plenty of colorful tables for this multi-player pong game which helps to hone both physical and social skills.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="pool-locker-rooms" rel="p-368-160" data-type="image"<?php /* data-image="http://content.colemancountry.com/ssp/images.php?album=62&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0"*/ ?>>
				<div class="singleimg"><div class="inner"><img src="img/ui/image-placeholder.jpg" alt=""></div></div>
				<h1>Pool Locker Rooms</h1>
				<div class="description">
				<div class="inner">
					<p>Modern locker rooms with secured cubbies and rest rooms adjoin the pool deck, which also is equipped with outdoor showers. Each group has its own locker area, where campers keep their two bathing suits and a sweatshirt for cool days.  The best part is the locker rooms' proximity to the pools!</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="yoga" rel="p-424-181" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=56&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>"Om" on the Range <em>(Yoga)</em></h1>
				<div class="description">
				<div class="inner">
					<p>Om on the Range is a 2,700-square-foot covered and turfed deck for Yoga, a favorite retreat from the sun and the active camp environment, where campers get to explore their inner strength and get to practice mind-body relaxation techniques.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="pools" rel="p-398-207" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=66&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0" data-video="vid/pool">
				<h1>Scherr's Swimmin' Holes <em>(Pools)</em></h1>
				<div class="description">
				<div class="inner">
					<p>Jeff Scherr, former program director & swim supervisor since the inception of Coleman Country, lends his name to our swim complex, which includes 3  climate-controlled pools, locker rooms, a water park, and bathrooms. With two swims daily (instructional and free), bathing suit and towel service, and a cadre of Nassau-certified lifeguards and Red Cross Water Safety Instructors, our campers enjoy the ultimate swim experience.</p>
				</div>
				</div>
			</div>
			<div class="point activity" id="basketball" rel="p-96-164" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=28&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Basketball Courts</h1>
				<div class="description">
				<div class="inner">
					<p>Hoops are a favorite at Coleman Country, and our courts feature adjustable baskets and varying court lengths to fit the age and size of the campers playing there. "Hoop-lah" is our covered basketball court, created expressly for our younger campers to hone their skills. Rain or shine, campers will find the perfect spot from which to dribble or shoot.</p>
				</div>
				</div>
			</div>
			<div class="point activity" id="basketball2" rel="p-208-149" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=28&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Basketball Courts</h1>

				<div class="description">
				<div class="inner">
					<p>Hoops are a favorite at Coleman Country, and our courts feature adjustable baskets and varying court lengths to fit the age and size of the campers playing there. "Hoop-lah" is our covered basketball court, created expressly for our younger campers to hone their skills. Rain or shine, campers will find the perfect spot from which to dribble or shoot.</p>
				</div>
				</div>
			</div>
			
			<div class="point activity" id="water-misters" rel="p-252-144" data-type="image"<?php /*data-image="http://content.colemancountry.com/ssp/images.php?album=69&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0"*/ ?>>
				<div class="singleimg"><div class="inner"><img src="http://content.colemancountry.com/ssp/albums/album-69/lg/00_SpitzersSpritzers.JPG" alt=""></div></div>
				<h1>Spitzer's Spritzer <em>(Water Misters)</em></h1>
				<div class="description">
				<div class="inner">
					<p>This water mister is one of several dotting the landscape on The Ranch, cooling down campers who frolic in the spray. No need to don a bathing suit to keep cool. Misters are strategically stationed (even along a main pathway to the pools) to dispense a needed vapor in-between activities, even though we have air-conditioned indoor spaces throughout The Ranch.</p>
				</div>
				</div>
			</div>
      
      <div class="point activity" id="volleyball" rel="p-130-180" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=75&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Volleyball</h1>
				<div class="description">
				<div class="inner">
					<p>Six indoor and outdoor volleyball courts with graduated nets provide the perfect places to practice a serve, set, or dig. Campers perfect the art of catching and throwing with Newcomb, a favorite activity on The Ranch. Leaving nothing to chance and always optimizing learning opportunities, our rotation spots are numbered for the ease and confidence of our campers!</p>
				</div>
				</div>
			</div>
      
      
			
			
			<!--
				*************************
					Combination hot-spots
				*************************
			-->
			
			<div class="point activity" data-multiple="true" data-subs="#gph, #martial-arts" id="grand-playhouse" rel="p-42-85" data-type="image">
				<h1>Grand Playhouse <em>(GPH)</em></h1>
			</div>
			
			<div class="point activity" data-multiple="true" data-subs="#picnic-grove, #theater, #sports-deck" id="pavilion" rel="p-162-109" data-type="image">
				<h1>Poppy's Pavilion</h1>
			</div>
			
			<div class="point activity" data-multiple="true" data-subs="#dining-room, #gymnastics" id="dining-gym" rel="p-131-125" data-type="image">
				<h1>Chow Hall and Pikes Peak</h1>
			</div>
			
			<div class="point activity" data-multiple="true" data-subs="#gaga-complex, #water-park" id="dome" rel="p-364-172" data-type="image">
				<h1>Dream Dome</h1>
			</div>
      
      <div class="point activity" id="cabins" rel="p-105-109" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=61&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Pioneer Village Cabins</h1>
				
				<div class="desciption">
				<div class="inner">
					<p>Our western-themed town for our Pioneer campers - ages 3 through 5 - is a "camp within a camp" and includes "Pioneer houses, " where each group has their own bunk for arrival, rest time, and afternoon "round-up." After experiencing all of the activities on The Ranch, our smallest campers are provided with a quiet place of their own. The "front lot set", which includes the Livery, the Bank, and the General Store, is a sanctuary from all the action throughout camp, and a welcome, familiar dwelling for the Pioneers, who begin and end each day in their familiar surroundings.</p>
				</div>
				</div>
			</div>
      
      <div class="point activity" id="pioneer-station" rel="p-118-121" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=60&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Pioneer Station</h1>
				<div class="description">
				<div class="inner">
					<p>This completely sheltered picnic grove is home to our outdoor lunch area and our Cantina for both morning and afternoon snacks. After a day of play in Coleman Country, the Pioneer Station ice cream cart is an enticing sight! Pioneer Station is adjacent to Poppy's Pavilion (designed by our beloved Poppy!) which also serves as an al fresco dining area. Pioneer Station is so named because it also is home base for our youngest campers, the Pioneers.</p>
				</div>
				</div>
			</div>
      
      <div class="point activity" id="petting-zoo" rel="p-156-103" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=41&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0">
				<h1>Critter Corral <em>(nature and petting zoo)</em></h1>
				<div class="description">
				<div class="inner">
					<p>Our indoor and outdoor facilities (Livery and Critter Corral, respectively) are home to animals both large and small. Here, campers will meet Iggy the Pig, Billy the Goat, and Sunshine the Bunny. The nature center is a hub of activity, with campers incubating chicks, caring for iguanas, shearing sheep, and feeding calves. Campers regularly enjoy extraordinary opportunities to explore the miracles of nature.</p>
				</div>
				</div>
			</div>
      
      <div class="point activity" id="tennis2" rel="p-240-217" data-type="image" data-image="http://content.colemancountry.com/ssp/images.php?album=71&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0" data-video="vid/tennis">
				<h1>Tennis Courts</h1>
				<div class="description">
				<div class="inner">
					<p>Four regulation-size outdoor courts with cushioned decking and one Pioneer-size court complete our tennis complex, which also includes four miniature covered courts and an electronic tennis wall. Specialized equipment and talented pros help us teach this life-skill sport to all ages, whether they are perfecting their lob or learning the proper stance with our imprinted footprints for where to stand on the Pioneer court.</p>
				</div>
				</div>
			</div>
      
      <div class="point activity" id="junior-soccer" rel="p-385-176" data-type="image"<?php /* data-image="http://content.colemancountry.com/ssp/images.php?album=49&w=575&h=323&s=0&q=80&sh=1&tw=100&th=100&ts=0&tlw=16&tlh=16&tq=60&tsh=1&pw=54&ph=40&aps=0"*/ ?>>
      	<div class="singleimg"><div class="inner"><img src="http://content.colemancountry.com/ssp/albums/album-49/lg/001_LandsmanLanding.JPG" alt=""></div></div>
				<h1>Landman's Landing <em>(Junior Soccer)</em></h1>
				<div class="description">
				<div class="inner">
					<p>A full range of games also takes place in this shaded spot: whether it's Beachball Baseball or Pac-Man Soccer, our nursery through kindergarten-age campers have their very own athletic field.</p>
				</div>
				</div>
			</div>
			
			
		</div><!-- eof: .map -->
		
		
		<!--
			*************************
				Map Key
			*************************
		-->
		<?php include 'includes/mapkey.php'; ?>
		
		
		<!--
			*************************
				Zoom Buttons
			*************************
		-->
		<ul id="map_zoom">
			<li><a href="#" id="zoom_in"><img src="img/ui/<?php if ($mobile=='1'): ?>zoom-in-circle.png<?php else: ?>zoom-in-tab.png<?php endif; ?>" alt="Zoom In" border="0" /></a></li>
			<li><a href="#" id="zoom_out"><img src="img/ui/<?php if ($mobile=='1'): ?>zoom-out-circle.png<?php else: ?>zoom-out-tab.png<?php endif; ?>" alt="Zoom Out" border="0" /></a></li>
		</ul>
		
	</div><!-- eof: #content -->
	
</body>
</html>