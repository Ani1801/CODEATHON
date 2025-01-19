// script.js

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);

    alert('Login functionality not yet implemented!');
});
