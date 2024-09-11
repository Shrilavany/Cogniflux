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

  // Update the DOM
  document.getElementById("total-questions").textContent = totalQuestions;
  document.getElementById("questions-attended").textContent = questionsAttended;
  document.getElementById("total-marks").textContent = totalMarks;
  document.getElementById("motivational-quote").textContent = motivationalQuote;

  // Data for charts
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
  new Chart(document.getElementById("combined-chart"), {
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
  new Chart(document.getElementById("combined-chart"), {
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

  // Detail description interactions
  const detailBox = document.getElementById("detail-box");
  const buttons = document.querySelectorAll(".interactive-button");

  const descriptions = {
    empathy: {
      21: "Sensitive",
      16: "Considerate",
      11: "Adapt",
      6: "Struggling",
      0: "Limit",
    },
    adaptability: {
      21: "Flexible",
      16: "Adjustable",
      11: "Average",
      6: "Rigid",
      0: "Inflexible",
    },
    communication: {
      21: "Excellent",
      16: "Good",
      11: "Average",
      6: "Poor",
      0: "Ineffective",
    },
  };

  function showDetails(category) {
    const score = totalMarks;
    let description = "";

    if (score >= 21) {
      description = descriptions[category][21];
    } else if (score >= 16) {
      description = descriptions[category][16];
    } else if (score >= 11) {
      description = descriptions[category][11];
    } else if (score >= 6) {
      description = descriptions[category][6];
    } else {
      description = descriptions[category][0];
    }

    detailBox.innerHTML = `
          <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          <p>${description}</p>
      `;
    detailBox.style.display = "block";
  }

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const category = this.getAttribute("data-category");
      showDetails(category);
    });
  });

  // Add functionality to the "Next" button
  document.getElementById("next").addEventListener("click", function () {
    window.location.href = "nextPage.html"; // Update with your next page URL
  });
});
