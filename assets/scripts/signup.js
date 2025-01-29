document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex

    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(function (message) {
        message.textContent = '';
    });

    // Validation: Ensure all fields are filled
    if (name.trim() === "") {
        displayErrorMessage('name', 'Full name is required.');
        return;
    }

    if (email.trim() === "") {
        displayErrorMessage('email', 'Email is required.');
        return;
    }

    if (password.trim() === "") {
        displayErrorMessage('password', 'Password is required.');
        return;
    }

    if (confirmPassword.trim() === "") {
        displayErrorMessage('confirm-password', 'Please confirm your password.');
        return;
    }

    if (!emailPattern.test(email)) {
        displayErrorMessage('email', 'Please enter a valid email address.');
        return;
    }

    if (password.length < 6) {
        displayErrorMessage('password', 'Password must be at least 6 characters long.');
        return;
    }

    if (password !== confirmPassword) {
        displayErrorMessage('confirm-password', 'Passwords do not match.');
        return;
    }

    alert('Sign Up Successful!');
    window.location.href = "./db.html"; // Redirect to db.html
});

function displayErrorMessage(inputId, message) {
    const inputElement = document.getElementById(inputId);
    const errorMessage = document.querySelector(`#${inputId} ~ .error-message`);
    errorMessage.textContent = message;
}
