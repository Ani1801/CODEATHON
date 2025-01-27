// Example: welcome.js
document.addEventListener("DOMContentLoaded", function() {
    // Example of checking if the user is logged in
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        document.getElementById("welcome-message").innerText = `Welcome back, ${user.name}!`;
    } else {
        window.location.href = "index.html"; // Redirect to login if no user is found
    }
});

// Logout functionality
document.getElementById("logout-btn").addEventListener("click", function() {
    localStorage.removeItem("user");
    window.location.href = "index.html"; // Redirect to login
});
