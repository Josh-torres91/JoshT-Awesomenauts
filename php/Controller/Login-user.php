<?php

require_once (__DIR__ . "/../model/Config.php");

$array = array(
    'exp' => '',
    'exp1' => '',
    'exp2' => '',
    'exp3' => '',
    'exp4' => '',
);

$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
$query = $_SESSION["connection"]->query("SELECT * FROM users WHERE BINARY username = '$username'");
// All info is stored in the query.
// It's stored as an array.
if ($query->num_rows == 1) {
    $row = $query->fetch_array();

    if ($row["password"] === crypt($password, $row["salt"])) {
        $_SESSION["authenticated"] = true;
        $array["exp"] = $row["exp"];
        
       header("Location: " . $path . "index.php");
        // The double equals sign checks
        // if what's on the left is equal
        // to what's on the right.
        // The triple equals sign checks
        // what the double equals checks
        // but also checks if the data is
        // of the same type.
    }
} else {
    echo "<p>Invalid username and password2</p>";
}