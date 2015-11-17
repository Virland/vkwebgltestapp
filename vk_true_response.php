<?php
header("Content-Type: application/json; encoding=utf-8");

$input = $_POST; 

$response['response'] = array(
	'item_id' => 25, 
	'title' => '100 золотых монет', 
	'photo_url' => 'http://g01.a.alicdn.com/kf/HTB1r14CIFXXXXc3XpXXq6xXFXXXV/Wholesale-Pillow-Cushion-Cute-Emoji-Funny-Poo-Shit-Shape-Pillow-Stuff-Doll-Novelty-Free-Shipping-2015.jpg_50x50.jpg',
	'price' => 1
	);

echo json_encode($response);
?>