document.addEventListener("DOMContentLoaded", function () {
  // Example data
  const totalQuestions = 5;
  const questionsAttended = 5;

  // Function to generate a random score between 20 and 25
  function getRandomScore(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Generate a random score between 20 and 25
  const totalMarks = getRandomScore(20, 25);

  // Motivational quote
  const motivationalQuote =
    "Adaptability is not imitation. It means power of resistance and assimilation. – Mahatma Gandhi";

  // Update the DOM with initial values
  document.getElementById("total-questions").textContent = totalQuestions;
  document.getElementById("questions-attended").textContent = questionsAttended;
  document.getElementById("total-marks").textContent =
    "Calculating your score..."; // Placeholder text
  document.getElementById("motivational-quote").textContent = motivationalQuote;

  // Example data for charts
  const pieData = {
    labels: ["Attended", "Not Attended"],
    datasets: [
      {
        data: [questionsAttended, totalQuestions - questionsAttended],
        backgroundColor: ["#4caf50", "#ff5722"],
      },
    ],
  };

  const barData = {
    labels: ["Marks"],
    datasets: [
      {
        label: "Total Marks",
        data: [totalMarks],
        backgroundColor: "#2196f3",
      },
    ],
  };

  // Create pie chart
  new Chart(document.getElementById("pie-chart"), {
    type: "pie",
    data: pieData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.label || "";
              if (context.parsed !== null) {
                label += ": " + context.parsed + "%";
              }
              return label;
            },
          },
        },
      },
    },
  });

  // Create bar chart
  new Chart(document.getElementById("bar-chart"), {
    type: "bar",
    data: barData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return context.dataset.label + ": " + context.raw;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // Function to reveal the total marks with a delay
  function revealMarks() {
    document.getElementById("total-marks").textContent = totalMarks; // Reveal the marks
  }

  // Set a delay to reveal the marks after 2 seconds
  setTimeout(revealMarks, 2000); // Adjust delay as needed

  // Add functionality to the "Next" button
  document.getElementById("next").addEventListener("click", function () {
    // For example, redirect to another page or initiate the next step
    window.location.href = "nextPage.html"; // Update with your next page URL
  });
});
