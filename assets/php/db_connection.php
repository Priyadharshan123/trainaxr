<?php
$servername = "localhost";
$username   = "u956138031_user"; // e.g., u123456789_user
$password   = "Trainaxr123";
$dbname     = "u956138031_client_data";     // e.g., u123456789_demo

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}
?>
