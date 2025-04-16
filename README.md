# MiniCollabApp

A simple web-based task collaboration application built with PHP, MySQL, HTML, CSS, and JavaScript. It allows users to add, update, and complete tasks, while providing admins with control over all user tasks.

## 🚀 Features

- User Registration & Login (with roles: `admin`, `user`)
- Role-based Dashboard:
  - Users can:
    - Add tasks with title, deadline, and priority
    - Mark tasks as completed
    - Edit their own tasks
  - Admins can:
    - View all tasks by all users
    - Delete any task
    - Filter tasks by user
- Task Status: Shows whether a task is `Pending` or `Completed`
- Responsive UI using table layouts with clean styling
- Secure password hashing using `password_hash()` / `password_verify()`
- Proper project structure with folders for `auth`, `db`, `config`, `styles`, `scripts`, etc.

---

## 🛠️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/MiniCollabApp.git
cd MiniCollabApp
```

### 2. Import the Database

Open your terminal or command line:

```bash
mysql -u root -p
```

Then run:

```sql
CREATE DATABASE mini_collab_app;
USE mini_collab_app;
SOURCE path/to/mini_collab_app.sql;
```

> Replace `path/to/mini_collab_app.sql` with the actual path to your `.sql` file.

### 3. Configure Database Connection

Edit the file at:  
`/config/config.php`

Update your DB credentials if needed:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'mini_collab_app');
define('DB_USER', 'root');
define('DB_PASS', '');
```

---

## 📂 Project Structure

```
MiniCollabApp/
├── auth/               # Login, register, logout scripts
├── config/             # DB configuration
├── db/                 # Database connection script
├── public/             # HTML files (login, register, dashboards)
├── scripts/            # JavaScript files
├── styles/             # CSS files
├── sql/                # mini_collab_app.sql backup
└── README.md
```

---

## 👤 Sample Login Credentials

| Role   | Email              | Password   |
|--------|--------------------|------------|
| Admin  | admin@example.com  | admin123   |
| User   | user@example.com   | user123    |

---

## 📌 Notes

- Default passwords are already **hashed** in the SQL dump.
- You can register new users via the registration page.

---

