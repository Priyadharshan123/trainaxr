<?php
header("Content-Type: application/json");

$response = [
    "status" => "success",
    "data" => [
        "token" => bin2hex(random_bytes(32))
    ]
];

echo json_encode($response);
?>
