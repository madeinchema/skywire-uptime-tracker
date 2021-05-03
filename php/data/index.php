<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

$file = '../db/visorsUptimeList.json';
$current = file_get_contents('https://uptime-tracker.skywire.skycoin.com/uptimes');
echo file_put_contents($file, $current);

