<?php
session_start();
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../db/db.php';

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$email = trim($data["email"]);
$password = trim($data["password"]);

if (empty($email) || empty($password)) {
    echo json_encode(["error" => "Email and password are required."]);
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user["password"])) {
    $_SESSION["user_id"] = $user["id"];
    $_SESSION["user_name"] = $user["name"];
    $_SESSION["role"] = $user["role"];
    echo json_encode(["success" => true, "role" => $user["role"]]);
} else {
    echo json_encode(["error" => "Invalid credentials."]);
}
?>
