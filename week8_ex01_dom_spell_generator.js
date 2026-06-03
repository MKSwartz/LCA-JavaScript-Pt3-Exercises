document.addEventListener("DOMContentLoaded", function () {
  const spellArea = document.getElementById("spellArea");
  const generateButton = document.getElementById("generateButton");
  const ingredientsList = document.getElementById("ingredientsList");

  const ingredients = ingredientsList.getElementsByTagName("li");
  // store in array
  const ingredientArray = [];
  // loop array
  for (let i = 0; i < ingredients.length; i++) {
    ingredientArray.push(ingredients[i].textContent);
  }

  // RANDOM INGREDIENTS FUNCTION
  const randomIngredient = () => {
    const randomIndex = Math.floor(Math.random() * ingredientArray.length);
    return ingredientArray[randomIndex];
  };

  // RANDOMW COLOUR FUNCTION
  const randomColour = () => {
    const colours = [
      "red",
      "yellow",
      "blue",
      "green",
      "purple",
      "pink",
      "lightblue",
      "orange",
    ];
    const randomNum = Math.floor(Math.random() * colours.length);
    return colours[randomNum];
  };

  // COUNTDOWN FUNCTION
  const startCountdown = () => {
    let count = 3;

    //button must be off when countdown is happening
    generateButton.disabled = true;

    const countdownInterval = setInterval(() => {
      // the countdown
      if (count > 0) {
        spellArea.textContent = count;
        count--;
      } else {
        // when 0, display
        clearInterval(countdownInterval);

        const spellIngredient = randomIngredient();
        const spellMessage = `Bippity boppity, ${spellIngredient} is now a spell property!`;

        //edit spellArea
        spellArea.textContent = spellMessage;

        spellArea.style.backgroundColor = randomColour();

        generateButton.disabled = false; // re-enables button (cause you have to do that)
      }
    }, 1000);
  };

  generateButton.addEventListener("click", startCountdown);
});
