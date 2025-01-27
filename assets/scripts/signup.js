// Updated signup.js
document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Create user object
    const userData = {
        name,
        email,
        password
    };

    // Send user data to the backend via a POST request
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Sign Up Successful!');
            window.location.href = "welcome.html"; // Redirect to the welcome page after success
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error during sign up:', error);
        alert('An error occurred during sign up.');
    });
});
