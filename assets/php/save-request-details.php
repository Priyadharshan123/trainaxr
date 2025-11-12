<?php
// Load DB
require 'db_connection.php';

// Load PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require __DIR__ . '/phpmailer.php';
require __DIR__ . '/smtp.php';
require __DIR__ . '/exception.php';


// Sanitize inputs
$name         = htmlspecialchars(trim($_POST['name'] ?? ''));
$email        = htmlspecialchars(trim($_POST['email'] ?? ''));
$phone        = htmlspecialchars(trim($_POST['phone'] ?? ''));
$company      = htmlspecialchars(trim($_POST['company'] ?? ''));
$companySize  = htmlspecialchars(trim($_POST['company_size'] ?? ''));
$industry     = htmlspecialchars(trim($_POST['industry'] ?? ''));
$region       = htmlspecialchars(trim($_POST['region'] ?? ''));

// Check required fields
if (!$name || !$email || !$phone) {
    http_response_code(400);
    echo "Missing required fields";
    exit;
}

// 1️⃣ Save into DB
$stmt = $conn->prepare("INSERT INTO demo_requests 
(name, email, phone, company, company_size, industry, region)
VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $name, $email, $phone, $company, $company_size, $industry, $region);

if (!$stmt->execute()) {
    http_response_code(500);
    echo "Database error: " . $stmt->error;
    exit;
}

// 2️⃣ Send Email Notification
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';   // Replace with Hostinger SMTP
    $mail->SMTPAuth   = true;
    $mail->Username   = 'dharshanp650@gmail.com';   // your domain email
    $mail->Password   = 'bcxd lktg tlww xxry';  // app password
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    $mail->setFrom('dharshanp650@gmail.com', 'TrainXR Website');
    $mail->addAddress('dharshanp650@gmail.com'); // where you want to receive emails
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);
    $mail->Subject = "New Demo Request from $name";
    $mail->Body = "
        <h2>New Demo Request</h2>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone:</strong> $phone</p>
        <p><strong>Company:</strong> $company</p>
        <p><strong>Company_size:</strong> $company_size</p>
        <p><strong>Industry:</strong> $industry</p>
        <p><strong>Region:</strong> $region</p>
    ";

    $mail->send();
    echo "success";
} catch (Exception $e) {
    error_log("Mail Error: " . $mail->ErrorInfo);
    echo "Mail error: " . $mail->ErrorInfo;
}
?>
