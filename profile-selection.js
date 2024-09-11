document.addEventListener("DOMContentLoaded", () => {
  let voices = [];
  const femaleVoices = []; // Array to store female voices

  function loadVoices() {
    voices = speechSynthesis.getVoices();
    femaleVoices.length = 0; // Clear the array
    femaleVoices.push(
      ...voices.filter((voice) => voice.name.toLowerCase().includes("female"))
    );
    console.log(femaleVoices); // Log available female voices for inspection
  }

  // Load voices when they are available
  speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices(); // Ensure voices are loaded when the script runs

  document.querySelectorAll(".profile-option").forEach((image) => {
    image.addEventListener("click", function () {
      // Remove 'selected' class from all images
      document
        .querySelectorAll(".profile-option")
        .forEach((img) => img.classList.remove("selected"));

      // Add 'selected' class to the clicked image
      this.classList.add("selected");

      const imgSrc = this.getAttribute("data-image");
      const message = this.getAttribute("data-message");
      const audioSrc = this.getAttribute("data-audio"); // Get the audio file path

      const previewImg = document.getElementById("profile-preview");
      const messageEl = document.getElementById("profile-message");
      const audioPlayer = document.getElementById("profile-audio");

      previewImg.src = imgSrc; // Update the profile preview image
      previewImg.style.display = "block"; // Show the image

      messageEl.textContent = message; // Set the introduction message
      messageEl.style.display = "block"; // Show the message

      // Set the audio source and play the audio
      if (audioSrc) {
        audioPlayer.src = audioSrc;
        audioPlayer
          .play()
          .catch((error) => console.error("Error playing audio:", error));
      } else {
        console.error("No audio source provided.");
      }

      // Speak the introduction message
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(message);

        // Choose the voice from the list based on data-voice attribute
        // Assuming data-voice is set up correctly and matches one of the voices
        const voiceName = this.getAttribute("data-voice");
        const selectedVoice = voices.find((voice) => voice.name === voiceName);
        if (selectedVoice) {
          utterance.voice = selectedVoice; // Use the specified voice
        } else {
          console.warn(`Voice '${voiceName}' not found.`);
        }
        speechSynthesis.speak(utterance);
      } else {
        console.error("SpeechSynthesis API is not supported in this browser.");
      }
    });
  });

  document.getElementById("confirm-btn").addEventListener("click", function () {
    const img = document.getElementById("profile-preview");
    if (img.src) {
      // Display the thank-you message
      const messageEl = document.getElementById("profile-message");
      messageEl.textContent = "Thank you for choosing me as your profile!";
      messageEl.style.display = "block";

      // Show the "Let’s Start" button
      document.getElementById("start-btn").style.display = "inline-block";
    } else {
      alert("Please select a picture first.");
    }
  });

  document.getElementById("start-btn").addEventListener("click", function () {
    // Add functionality to proceed to the next step
    alert("Let’s start the game!");
    // For example, redirect to another page or initiate the game
    // window.location.href = 'game.html'; // Example redirect
  });
});
