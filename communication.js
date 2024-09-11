document.addEventListener("DOMContentLoaded", function () {
  const questions = [
    "You would thank someone who helped you with a task or project. 🙏",
    "You would listen actively to someone who needs to talk about their problems. 🗣",
    "You would ask for permission before sharing someone's idea or work. 📝",
    "You would apologize for a mistake that affected someone else. 🙇",
    "You would offer help to someone who is struggling with a heavy workload. 🤝",
    "You would clarify expectations before starting a new project. 📋",
    "You would give credit to someone who contributed to a team effort. 🏅",
    "You would speak up if you witnessed harassment or bullying. 🚨",
    "You would provide feedback to someone who asks for it. 🗨",
    "You would show appreciation for someone's support and encouragement. 🌟",
  ];

  const numQuestions = 5;
  let currentQuestions = [];
  let currentQuestionIndex = 0;
  let score = 0;
  const questionWeight = [5, 4, 3, 2, 1]; // Scores for each choice from Strongly Agree to Strongly Disagree
  let userSelections = {}; // Track user selections

  function getRandomQuestions() {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numQuestions);
  }

  function displayQuestion(index) {
    if (index >= currentQuestions.length) {
      showResult();
      return;
    }

    document.getElementById("question").textContent = currentQuestions[index];

    document
      .querySelectorAll(".choice-container")
      .forEach((choice, choiceIndex) => {
        choice.querySelector(".choice-text").textContent = [
          "Strongly Agree 😍",
          "Agree 🙂",
          "Neutral 😐",
          "Disagree 😕",
          "Strongly Disagree 😠",
        ][choiceIndex];
        choice
          .querySelector(".choice-text")
          .setAttribute("data-number", choiceIndex + 1);

        // Clear previous selection style
        choice.classList.remove("selected");

        // Restore the previous selection if exists
        if (userSelections[index] === choiceIndex + 1) {
          choice.classList.add("selected");
        }
      });

    document.getElementById("next").style.display =
      index < currentQuestions.length - 1 ? "block" : "none";
    document.getElementById("submit-btn").style.display =
      index === currentQuestions.length - 1 ? "block" : "none";
    document.getElementById("back").style.display =
      index > 0 ? "block" : "none";
    updateProgressBar();
  }

  function handleChoiceSelection() {
    document
      .querySelectorAll(".choice-container")
      .forEach((c) => c.classList.remove("selected"));
    this.classList.add("selected");
  }

  function handleNext() {
    const selectedChoice = document.querySelector(
      ".choice-container.selected .choice-text"
    );
    if (!selectedChoice) {
      alert("Please select an answer before proceeding.");
      return;
    }

    // Save the selection for the current question
    userSelections[currentQuestionIndex] = parseInt(
      selectedChoice.getAttribute("data-number")
    );

    // Update the score
    score += questionWeight[userSelections[currentQuestionIndex] - 1];

    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
  }

  function handleBack() {
    if (currentQuestionIndex > 0) {
      // Subtract the score for the previous choice
      const previousChoice = document.querySelector(
        ".choice-container.selected .choice-text"
      );
      if (previousChoice) {
        score -=
          questionWeight[
            parseInt(previousChoice.getAttribute("data-number")) - 1
          ];
      }

      // Remove the saved selection for the current question
      delete userSelections[currentQuestionIndex];

      currentQuestionIndex--;
      displayQuestion(currentQuestionIndex);
    }
  }

  function showResult() {
    // Generate a result based on the score
    let resultText = "";
    if (score >= 21 && score <= 25) {
      resultText = "Highly Communicative 🌟";
    } else if (score >= 16 && score <= 20) {
      resultText = "Moderately Communicative 😊";
    } else if (score >= 11 && score <= 15) {
      resultText = "Average Communication 🙂";
    } else if (score >= 6 && score <= 10) {
      resultText = "Low Communication 😕";
    } else {
      resultText = "Very Low Communication 😔";
    }

    localStorage.setItem("communicationScore", score); // Save communication score

    document.getElementById("game").style.display = "none";
    document.getElementById("result").style.display = "flex";
    document.getElementById(
      "result-text"
    ).textContent = `Your communication level: ${resultText}`;
  }

  function resetGame() {
    document.getElementById("game").style.display = "flex";
    document.getElementById("result").style.display = "none";
    score = 0;
    currentQuestionIndex = 0;
    userSelections = {}; // Reset user selections
    currentQuestions = getRandomQuestions();
    displayQuestion(currentQuestionIndex);
  }

  function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / numQuestions) * 100;
    document.getElementById("progress").style.width = `${progress}%`;
  }

  document.getElementById("play-again").addEventListener("click", resetGame);
  document.querySelectorAll(".choice-container").forEach((choice) => {
    choice.addEventListener("click", handleChoiceSelection);
  });
  document.getElementById("next").addEventListener("click", handleNext);
  document.getElementById("back").addEventListener("click", handleBack);

  // Initialize the game
  currentQuestions = getRandomQuestions();
  displayQuestion(currentQuestionIndex);
});
