const unameInput = document.getElementById("uname");
const pwdInput = document.getElementById("pwd");
const modal = document.querySelector(".modal");
const toggleBtn = document.querySelector(".btn-toggle-nav");
const sidebar = document.querySelector(".nav-sidebar");

// Login Validation
const validateLogin = (event) => {
  event.preventDefault(); // form was submitting; this is to stop that so modal can pop up
  const enteredUname = unameInput.value;
  const enteredPwd = pwdInput.value;

  if (enteredUname === "admin" && enteredPwd === "password123") {
    window.location.href = "index.html";
  } else {
    modal.style.display = "block";
  }
};

// Dismiss Modal
const dismissModal = () => {
  modal.style.display = "none";
  pwdInput.value = ""; // clears password field for user to try again
};

// Toggle Navigation
const toggleNav = () => {
  if (sidebar.style.display === "none" || sidebar.style.display === "") {
    sidebar.style.display = "block";
  } else {
    sidebar.style.display = "none";
  }
};
