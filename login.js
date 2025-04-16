const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = loginForm.email.value.trim();
  const password = loginForm.password.value.trim();

  try {
    const response = await fetch("login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (result.success) {
      window.location.href = result.role === "admin"
        ? "admin_dashboard.html"
        : "user_dashboard.html";
    } else {
      errorMessage.textContent = result.error || "Invalid login.";
    }
  } catch (error) {
    console.error("Login failed:", error);
    errorMessage.textContent = "Something went wrong. Please try again.";
  }
});
