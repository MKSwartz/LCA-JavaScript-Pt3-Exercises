document.addEventListener("DOMContentLoaded", () => {
  let allDevelopers = [];

  fetch("developers.json")
    .then((response) => response.json())
    .then((developers) => {
      allDevelopers = developers;
      refreshDisplay();
    });

  // ---- Filter function
  const getFilteredDevelopers = () => {
    const searchTerm = document
      .getElementById("searchInput")
      .value.toLowerCase();
    if (!searchTerm) return allDevelopers;

    return allDevelopers.filter(
      (dev) =>
        dev.name.toLowerCase().includes(searchTerm) ||
        dev.role.toLowerCase().includes(searchTerm) ||
        dev.skills.some((skill) => skill.toLowerCase().includes(searchTerm)),
    );
  };

  // ---- Refresh function
  const refreshDisplay = () => {
    const filtered = getFilteredDevelopers();
    displayCards(filtered);
  };

  // ==== Create cards
  const displayCards = (developers) => {
    const container = document.getElementById("developerContainer");

    // ==== Developer counter
    document.getElementById("developerCount").textContent = developers.length;

    let html = "";

    for (let i = 0; i < developers.length; i++) {
      const dev = developers[i];
      html += `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100">
          <img src="${dev.avatar}" class="card-img-top" alt="${dev.name}"> 
          <div class="card-body">
            <h5 class="card-title">${dev.name}</h5>
            <h6 class="card-subtitle text-muted mb-2">${dev.role}</h6>
            <p class="card-text">
              <strong>Skills:</strong> ${dev.skills.join(", ")}<br>
              <strong>Location:</strong> ${dev.location}
            </p>
            ${dev.availableForHire ? '<span class="badge bg-success">Available for Hire</span>' : '<span class="badge bg-secondary">Not Available</span>'}
            <br><br>
            <button class="btn btn-sm btn-outline-warning toggle-hire-btn" data-id="${dev.id}">
              Toggle Hire Status
            </button>
          </div>
        </div>
      </div>
    `;
    }

    container.innerHTML = html;

    attachToggleListeners();
  };

  // ===== Toggle Hire Status
  const attachToggleListeners = () => {
    const toggleButtons = document.querySelectorAll(".toggle-hire-btn");
    for (let i = 0; i < toggleButtons.length; i++) {
      toggleButtons[i].addEventListener("click", (event) => {
        const id = parseInt(event.target.getAttribute("data-id"));
        toggleHireStatus(id);
      });
    }
  };

  const toggleHireStatus = (developerId) => {
    let theDeveloper = null;
    for (let i = 0; i < allDevelopers.length; i++) {
      if (allDevelopers[i].id === developerId) {
        theDeveloper = allDevelopers[i];
        break;
      }
    }

    if (theDeveloper.availableForHire === true) {
      theDeveloper.availableForHire = false;
    } else {
      theDeveloper.availableForHire = true;
    }

    refreshDisplay();
  };

  // ========  Live Search
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", refreshDisplay);

  // ==== Form Submission
  document
    .getElementById("addDeveloperForm")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("devName").value;
      const role = document.getElementById("devRole").value;
      const skillsText = document.getElementById("devSkills").value;
      const location = document.getElementById("devLocation").value;
      const available = document.getElementById("devAvailable").checked;

      if (name === "" || role === "" || skillsText === "") {
        alert("Please fill in all required fields (*)");
        return; // return to stop if failed validation
      }

      const skillsArray = [];
      const skillsParts = skillsText.split(",");
      for (let i = 0; i < skillsParts.length; i++) {
        skillsArray.push(skillsParts[i].trim());
      }

      let highestId = 0;
      for (let i = 0; i < allDevelopers.length; i++) {
        if (allDevelopers[i].id > highestId) {
          highestId = allDevelopers[i].id;
        }
      }
      const newId = highestId + 1;

      const newDeveloper = {
        id: newId,
        name: name,
        role: role,
        skills: skillsArray,
        location: location,
        availableForHire: available,
        avatar: "https://placehold.co/100x100/28a745/ffffff",
      };

      allDevelopers.push(newDeveloper);

      const modal = document.getElementById("addDeveloperModal");
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();

      document.getElementById("devName").value = "";
      document.getElementById("devRole").value = "";
      document.getElementById("devSkills").value = "";
      document.getElementById("devLocation").value = "";
      document.getElementById("devAvailable").checked = true;

      refreshDisplay();

      alert("New Developer Added");
    });
});
