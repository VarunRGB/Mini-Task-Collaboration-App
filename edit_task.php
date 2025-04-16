<?php
session_start();
require 'db.php';

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$task_id = $data["task_id"] ?? null;
$title = trim($data["title"]);
$deadline = trim($data["deadline"]);
$priority = trim($data["priority"]);
$user_id = $_SESSION["user_id"] ?? null;

if (!$user_id || !$task_id) {
    echo json_encode(["error" => "Invalid session or task."]);
    exit;
}

$stmt = $pdo->prepare("UPDATE tasks SET title = ?, deadline = ?, priority = ? WHERE id = ? AND user_id = ?");
$success = $stmt->execute([$title, $deadline, $priority, $task_id, $user_id]);

if ($success) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Failed to update task."]);
}
?>
