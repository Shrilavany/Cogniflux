document.addEventListener("DOMContentLoaded", function () {
  const questions = [
    "My friend told me they lost their job, I would feel concerned 😟",
    "I saw someone being bullied, I would feel sad for them 😢",
    "My sibling got an award, I would feel happy for them 😊",
    "My coworker was struggling with a project, I would offer to help 🤝",
    "My neighbour's pet went missing, I would feel sorry for them 😔",
    "A stranger dropped their groceries, I would feel inclined to assist them 🛒",
    "My classmate failed an important exam, I would feel sympathetic 😔",
    "My best friend had a bad day, I would feel upset for them 😞",
    "I heard about a natural disaster affecting people in another country, I would feel concerned 🌪",
    "My teammate got injured during a game, I would feel worried 🏥",
    "I saw someone crying on the street, I would stop them and ask if they need help? 😢",
    "My friend was upset over a breakup, I would offer them comfort 💔",
    "I heard someone talking about feeling lonely, I would reach out to them 🤗",
    "If a colleague was struggling with their workload, would you offer to help? 🤝",
    "My family member was going through a tough time, I would make an effort to spend time with them ❤",
    "A child was having a tantrum in public, I would try to understand the reason behind their behaviour 😕",
    "I saw someone drop their belongings, I would help them pick them up 🛍",
    "My neighbour was having a party and I wasn't invited, I would still wish them well 🎉",
    "If a friend was late to a meeting, would you consider if something might have happened to them? 🕒",
    "I saw someone struggling to carry heavy bags, I would offer to help them 💪",
  ];

  const numQuestions = 5;
  let currentQuestions = [];
  let currentQuestionIndex = 0;
  let score = 0;
  const questionWeight = [5, 4, 3, 2, 1]; // Scores for each choice from Strongly Agree to Strongly Disagree
  const userSelections = {}; // Track user selections

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
    let resultText = "";
    if (score >= 21 && score <= 25) {
      resultText = "Highly Empathetic 🌟";
    } else if (score >= 16 && score <= 20) {
      resultText = "Moderately Empathetic 😊";
    } else if (score >= 11 && score <= 15) {
      resultText = "Average Empathy 🙂";
    } else if (score >= 6 && score <= 10) {
      resultText = "Low Empathy 😕";
    } else {
      resultText = "Very Low Empathy 😔";
    }

    document.getElementById("game").style.display = "none";
    document.getElementById("result").style.display = "flex";
    document.getElementById(
      "result-text"
    ).textContent = `Your empathy level: ${resultText}`;
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
