document.addEventListener("DOMContentLoaded", function () {
  const questions = [
    "I am open to trying new approaches when faced with a challenge. 🌟",
    "I easily adjust to changes in my schedule or plans. 📅",
    "I am comfortable with ambiguity and uncertainty. 🌫",
    "I can pivot quickly in response to new information or feedback. 🔄",
    "I enjoy learning new skills and taking on new responsibilities. 📚",
    "I am flexible when working with others who have different work styles. 🤝",
    "I can adapt to new technology and tools quickly. 🛠",
    "I am resilient in the face of unexpected obstacles or setbacks. 💪",
    "I am willing to step out of my comfort zone to achieve a goal. 🚀",
    "I can adjust my communication style to suit different audiences. 🗣",
  ];

  const numQuestions = 5;
  const questionWeight = [5, 4, 3, 2, 1]; // Scores for each choice
  let currentQuestions = [];
  let currentQuestionIndex = 0;
  let score = 0;
  const userSelections = {}; // Track user selections

  const questionElement = document.getElementById("question");
  const choices = document.querySelectorAll(".choice-container");
  const nextButton = document.getElementById("next");
  const backButton = document.getElementById("back");
  const submitButton = document.getElementById("submit-btn");
  const progressElement = document.getElementById("progress");
  const resultText = document.getElementById("result-text");
  const playAgainButton = document.getElementById("play-again");

  function getRandomQuestions() {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numQuestions);
  }

  function displayQuestion(index) {
    if (index >= currentQuestions.length) {
      showResult();
      return;
    }

    questionElement.textContent = currentQuestions[index];

    choices.forEach((choice, choiceIndex) => {
      const choiceText = choice.querySelector(".choice-text");
      choiceText.textContent = [
        "Strongly Agree 😍",
        "Agree 🙂",
        "Neutral 😐",
        "Disagree 😕",
        "Strongly Disagree 😠",
      ][choiceIndex];
      choiceText.setAttribute("data-number", choiceIndex + 1);

      choice.classList.toggle(
        "selected",
        userSelections[index] === choiceIndex + 1
      );
    });

    nextButton.style.display =
      index < currentQuestions.length - 1 ? "block" : "none";
    submitButton.style.display =
      index === currentQuestions.length - 1 ? "block" : "none";
    backButton.style.display = index > 0 ? "block" : "none";
    updateProgressBar();
  }

  function handleChoiceSelection() {
    choices.forEach((c) => c.classList.remove("selected"));
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

    userSelections[currentQuestionIndex] = parseInt(
      selectedChoice.getAttribute("data-number")
    );
    score += questionWeight[userSelections[currentQuestionIndex] - 1];

    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
  }

  function handleBack() {
    if (currentQuestionIndex > 0) {
      const previousChoice = document.querySelector(
        ".choice-container.selected .choice-text"
      );
      if (previousChoice) {
        score -=
          questionWeight[
            parseInt(previousChoice.getAttribute("data-number")) - 1
          ];
      }

      delete userSelections[currentQuestionIndex];
      currentQuestionIndex--;
      displayQuestion(currentQuestionIndex);
    } else {
      alert("You are already on the first question.");
    }
  }

  function showResult() {
    let resultTextValue = "";
    if (score >= 21) {
      resultTextValue = "Highly Adaptable 🌟";
    } else if (score >= 16) {
      resultTextValue = "Moderately Adaptable 😊";
    } else if (score >= 11) {
      resultTextValue = "Average Adaptability 🙂";
    } else if (score >= 6) {
      resultTextValue = "Low Adaptability 😕";
    } else {
      resultTextValue = "Very Low Adaptability 😔";
    }

    localStorage.setItem("AdaptabilityScore", score);

    document.getElementById("game").style.display = "none";
    document.getElementById("result").style.display = "flex";
    resultText.textContent = `Your Adaptability level: ${resultTextValue}`;
  }

  function resetGame() {
    document.getElementById("game").style.display = "flex";
    document.getElementById("result").style.display = "none";
    score = 0;
    currentQuestionIndex = 0;
    Object.keys(userSelections).forEach((key) => delete userSelections[key]);
    currentQuestions = getRandomQuestions();
    displayQuestion(currentQuestionIndex);
  }

  function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / numQuestions) * 100;
    progressElement.style.width = `${progress}%`;
  }

  playAgainButton.addEventListener("click", resetGame);

  choices.forEach((choice) =>
    choice.addEventListener("click", handleChoiceSelection)
  );

  nextButton.addEventListener("click", handleNext);
  backButton.addEventListener("click", handleBack);

  currentQuestions = getRandomQuestions();
  displayQuestion(currentQuestionIndex);
});
