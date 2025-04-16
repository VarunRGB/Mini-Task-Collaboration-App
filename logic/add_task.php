<?php
session_start();
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../db/db.php';

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$title = trim($data["title"]);
$deadline = trim($data["deadline"]);
$priority = trim($data["priority"]);
$user_id = $_SESSION["user_id"] ?? null;

if (!$user_id) {
    echo json_encode(["error" => "Not logged in."]);
    exit;
}

$stmt = $pdo->prepare("INSERT INTO tasks (title, deadline, priority, user_id) VALUES (?, ?, ?, ?)");
$success = $stmt->execute([$title, $deadline, $priority, $user_id]);

echo json_encode($success ? ["success" => true] : ["error" => "Failed to add task."]);
