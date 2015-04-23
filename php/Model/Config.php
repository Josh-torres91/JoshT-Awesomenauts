<?php

require_once(__DIR__ . "/database.php");
session_start();
session_regenerate_id(true);


$path = "/JoshT-Awesomenauts/php/";

$host = "localhost";
$username = "root";
$password = "root";
$database = "awesomenauts_db";


if (!isset($_SESSION["connection"])) {
    $connection = new Database($host, $username, $password, $database);
    $_SESSION["connection"] = $connection;
}
// If the session variable isn't set, the connection
//  variable ceases to exist.