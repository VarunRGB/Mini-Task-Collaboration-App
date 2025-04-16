<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../db/db.php';

$stmt = $pdo->query("
  SELECT tasks.id, tasks.title, tasks.deadline, tasks.priority, tasks.status, users.name AS username
  FROM tasks
  JOIN users ON tasks.user_id = users.id
  ORDER BY tasks.id DESC
");

$tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode($tasks);
