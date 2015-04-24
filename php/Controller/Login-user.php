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
        $array["exp"] = $row["exp1"];
        $array["exp"] = $row["exp2"];
        $array["exp"] = $row["exp3"];
        $array["exp"] = $row["exp4"];
        $_SESSION["name"] = $username;
        echo json_encode($array);
    } else {
        echo "<p>Invalid username and password</p>";
    }
} else {
    echo "<p>Invalid username and password</p>";
}