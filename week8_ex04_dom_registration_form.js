document.addEventListener("DOMContentLoaded", () => {
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmInput = document.getElementById("confirmPassword");

  const usernameError = document.getElementById("usernameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const confirmError = document.getElementById("confirmError");

  const form = document.getElementById("registrationForm");
  const formMessage = document.getElementById("formMessage");

  // advised to keep HELPER FUNCTIONS on top
  const clearErrors = () => {
    usernameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmError.textContent = "";
    formMessage.textContent = "";
  };

  const resetBorders = () => {
    usernameInput.style.border = "";
    emailInput.style.border = "";
    passwordInput.style.border = "";
    confirmInput.style.border = "";
  };

  const clearForm = () => {
    usernameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    confirmInput.value = "";
  };

  // Task 2: Form Submission Listener
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // (trim to remove extra spaces + prevent spaces as valid input)
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmInput.value;

    let isValid = true;

    // Task 3 + 4: Validations
    // USERNAME
    if (username === "") {
      usernameError.textContent = "Field cannot be empty";
      usernameInput.style.border = "2px solid red";
      isValid = false;
    }

    // EMAIL
    if (email === "") {
      emailError.textContent = "Field cannot be empty";
      emailInput.style.border = "2px solid red";
      isValid = false;
    } else if (!email.includes("@")) {
      emailError.textContent = 'Email must contain an "@"';
      emailInput.style.border = "2px solid red";
      isValid = false;
    }

    //PASSWORD
    if (password === "") {
      passwordError.textContent = "Field cannot be empty";
      passwordInput.style.border = "2px solid red";
      isValid = false;
    } else if (password.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters long";
      passwordInput.style.border = "2px solid red";
      isValid = false;
    }

    // CONFIRM PASSWORD
    if (confirmPassword === "") {
      confirmError.textContent = "Please confirm your password";
      confirmInput.style.border = "2px solid red";
      isValid = false;
    } else if (password !== confirmPassword) {
      confirmError.textContent = "Passwords don't match";
      confirmInput.style.border = "2px solid red";
      isValid = false;
    }

    // SUCCESS MESSAGE
    if (isValid === true) {
      clearErrors();
      resetBorders();

      formMessage.textContent = "Registration successful!";
      formMessage.style.color = "green";
      formMessage.style.fontWeight = "bold";

      setTimeout(() => {
        formMessage.textContent = "";
      }, 3000);

      clearForm();

      // Log to console
      console.log("Registration data:");
      console.log("Username:", username);
      console.log("Email:", email);
    }
  });
});
