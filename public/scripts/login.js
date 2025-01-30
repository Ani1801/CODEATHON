document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const rememberMe = document.getElementById("rememberMe").checked;
  let isValid = true;

  // Reset error messages
  document.getElementById("email-error").style.display = "none";
  document.getElementById("password-error").style.display = "none";
  email.classList.remove("error");
  password.classList.remove("error");

  // Email validation
  if (!email.value || !email.value.includes("@")) {
    document.getElementById("email-error").style.display = "block";
    email.classList.add("error");
    isValid = false;
  }

  // Password validation
  if (!password.value) {
    document.getElementById("password-error").style.display = "block";
    password.classList.add("error");
    isValid = false;
  }

  if (isValid) {
    this.submit();
  } else {
    alert("Please fill all required fields correctly!");
  }
});
