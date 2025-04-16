<?php
session_start();
require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$task_id = $data['task_id'];
$status = $data['status'];

$user_id = $_SESSION['user_id'];

$stmt = $pdo->prepare("UPDATE tasks SET status = ? WHERE id = ? AND user_id = ?");
if ($stmt->execute([$status, $task_id, $user_id])) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => "Failed to update status"]);
}
?>
