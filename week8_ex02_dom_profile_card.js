document.addEventListener("DOMContentLoaded", function () {
  const profileName = document.getElementById("profileName");
  const profileRole = document.getElementById("profileRole");
  const profileCard = document.getElementById("profileCard");
  const updateNameBtn = document.getElementById("updateNameBtn");
  const updateRoleBtn = document.getElementById("updateRoleBtn");
  const toggleStatusBtn = document.getElementById("toggleStatusBtn");

  // TASK 2

  updateNameBtn.addEventListener("click", () => {
    const newName = prompt("Enter your name:");
    // Check if the user actually typed something before accepting input (AI suggested. I was just gonna accept anything)
    if (newName !== null && newName !== "") {
      profileName.textContent = newName;
    }
  });

  updateRoleBtn.addEventListener("click", () => {
    const newRole = prompt("Enter your role:");

    if (newRole !== null && newRole !== "") {
      profileRole.textContent = newRole;
    }
  });

  // TASK 3

  toggleStatusBtn.addEventListener("click", () => {
    profileCard.classList.toggle("active-status");
  });
});
