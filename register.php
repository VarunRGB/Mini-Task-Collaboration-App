<?php
require_once 'db.php'; // Make sure this is at the top

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $role = $_POST['role'] ?? 'user';

    if ($name && $email && $password && $role) {
        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Prepare the insert
        $stmt = $pdo->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
        try {
            $stmt->execute([$name, $email, $hashedPassword, $role]);
            // Redirect to login
            header("Location: login.html");
            exit();
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    } else {
        echo "Please fill in all fields.";
    }
} else {
    echo "Invalid request method.";
}
?>
