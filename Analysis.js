document.addEventListener("DOMContentLoaded", function () {
  // Example data
  const totalQuestions = 15;
  const questionsAttended = {
    adaptability: 5,
    communication: 5,
    empathy: 5,
  };
  const totalMarks = {
    adaptability: getRandomScore(20, 25),
    communication: getRandomScore(20, 25),
    empathy: getRandomScore(20, 25),
  };

  function getRandomScore(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Get user name from localStorage
  const userName = localStorage.getItem("userName") || "Achiever";
  document.getElementById("user-name").textContent = userName;
  document.getElementById("total-questions").textContent = totalQuestions;
  document.getElementById("questions-attended").textContent = Object.values(
    questionsAttended
  ).reduce((a, b) => a + b, 0);
  document.getElementById("total-marks").textContent = Object.values(
    totalMarks
  ).reduce((a, b) => a + b, 0);
  document.getElementById("motivational-quote").textContent = "";

  // Create combined chart
  const ctx = document.getElementById("combined-chart").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Adaptability", "Communication", "Empathy"],
      datasets: [
        {
          label: "Total Marks",
          data: [
            totalMarks.adaptability,
            totalMarks.communication,
            totalMarks.empathy,
          ],
          backgroundColor: ["#ff6347", "#ffa500", "#32cd32"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: "#fff", // Set legend text color to white
            font: {
              size: 16, // Adjust font size if needed
            },
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.label || "";
              if (context.parsed !== null) {
                label += ": " + context.parsed + " points";
              }
              return label;
            },
          },
        },
      },
    },
  });

  // Detail description interactions
  const detailDescription = document.getElementById("detail-description");

  function getScoreDescription(score, category) {
    if (score >= 21) {
      return category === "adaptability"
        ? '<span class="adaptability">Flexible</span>'
        : category === "communication"
        ? '<span class="communication">Excellent</span>'
        : '<span class="empathy">Sensitive</span>';
    } else if (score >= 16) {
      return category === "adaptability"
        ? '<span class="adaptability">Adjustable</span>'
        : category === "communication"
        ? '<span class="communication">Good</span>'
        : '<span class="empathy">Considerate</span>';
    } else if (score >= 11) {
      return category === "adaptability"
        ? '<span class="adaptability">Average</span>'
        : category === "communication"
        ? '<span class="communication">Average</span>'
        : '<span class="empathy">Adapt</span>';
    } else if (score >= 6) {
      return category === "adaptability"
        ? '<span class="adaptability">Rigid</span>'
        : category === "communication"
        ? '<span class="communication">Poor</span>'
        : '<span class="empathy">Struggling</span>';
    } else {
      return category === "adaptability"
        ? '<span class="adaptability">Inflexible</span>'
        : category === "communication"
        ? '<span class="communication">Ineffective</span>'
        : '<span class="empathy">Limit</span>';
    }
  }

  // Populate the detail description
  detailDescription.innerHTML = `
      <h3>Details:</h3>
      <p><strong>Adaptability:</strong> ${getScoreDescription(
        totalMarks.adaptability,
        "adaptability"
      )}</p>
      <p><strong>Communication:</strong> ${getScoreDescription(
        totalMarks.communication,
        "communication"
      )}</p>
      <p><strong>Empathy:</strong> ${getScoreDescription(
        totalMarks.empathy,
        "empathy"
      )}</p>
  `;
});
