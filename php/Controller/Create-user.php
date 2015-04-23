<?php
require_once(__DIR__ . "/../Model/Config.php");
require_once(__DIR__ . "/../Controller/Login-verify.php");

$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
// If your password is encrypted, it's made so no one
// can access you info and steal your password.

$salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$";

$hashedPassword = crypt($password, $salt);

$query = $_SESSION["connection"]->query("INSERT INTO users SET "
        . "username = '$username',"
        . "password = '$hashedPassword',"
        . "salt = '$salt' "
        . "exp = 0, "
        . "exp1 = 0, "
        . "exp2 = 0, "
        . "exp3 = 0, "
        . "exp4 = 0 ");

$_SESSION["name"] = $username;

if($query) {
    // This is needed for Ajax on index.php.
    echo "True";
}
 else {
    echo "<p>" . $_SESSION["connection"]->error . "</p>";
}