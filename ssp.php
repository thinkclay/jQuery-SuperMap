<?php
error_reporting(0);
include 'includes/xml2json.php';

$img = 'http://content.colemancountry.com/ssp/index.php?/site/data/no/21/500_418_2_80_1_120_120_0_80_2_54_40_0_0_0_r';
$vid = 'http://content.colemancountry.com/ssp/xml_cache/images_album_8_550_370_0_80_1_100_100_0_60_1_54_40_0_16_16_r.xml?1313611440';
$data = file_get_contents( $_GET['url'] );

echo xml2json::transformXmlStringToJson($data);
?>