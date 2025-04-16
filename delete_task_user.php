<?php
session_start();
require_once 'db.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['task_id'])) {
    echo json_encode(["error" => "Task ID is required"]);
    exit;
}

$task_id = $data['task_id'];
$user_id = $_SESSION['user_id'];

// Only delete if the task belongs to the user
$stmt = $pdo->prepare("DELETE FROM tasks WHERE id = ? AND user_id = ?");
if ($stmt->execute([$task_id, $user_id])) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Failed to delete task"]);
}
