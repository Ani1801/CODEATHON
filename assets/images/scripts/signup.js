// script.js

document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const phone = document.getElementById('phone').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    const userData = {
        name,
        email,
        phone
    };

    console.log('User Data:', userData);

    alert('Sign Up Successful!');
    window.location.href = "welcome.html"; // Redirect to welcome page
});
