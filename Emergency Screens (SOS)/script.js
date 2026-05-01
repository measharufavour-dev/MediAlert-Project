const sosButton = document.getElementById("sosButton");
let holdTimer;
const holdDuration = 3000; // 3 seconds

// 1. Function to start the countdown
function startHold(e) {
  // Prevent context menus on mobile
  e.preventDefault();
  const sosButton = document.getElementById("sosButton");
  const wrapper = document.querySelector(".sos-wrapper");
  let holdTimer;

  function startHold(e) {
    e.preventDefault();
    wrapper.classList.add("holding"); // Starts the visual ring fill

    holdTimer = setTimeout(() => {
      window.location.href = "HomeScreen2.html";
    }, 3000);
  }

  function cancelHold() {
    clearTimeout(holdTimer);
    wrapper.classList.remove("holding"); // Resets the visual ring
  }

  // Event listeners
  sosButton.addEventListener("mousedown", startHold);
  sosButton.addEventListener("touchstart", startHold);
  window.addEventListener("mouseup", cancelHold);
  window.addEventListener("touchend", cancelHold);

  // Add a class for a "pressing" visual effect (optional)
  sosButton.style.opacity = "0.7";
  sosButton.style.transform = "scale(0.95)";

  holdTimer = setTimeout(() => {
    // ACTION: This is where you redirect to your confirmation page
    window.location.href = "HomeScreen2.html";
  }, holdDuration);
}

// 2. Function to cancel if released early
function cancelHold() {
  clearTimeout(holdTimer);
  // Reset visual effect
  sosButton.style.opacity = "1";
  sosButton.style.transform = "scale(1)";
}

// 3. Event Listeners for Desktop and Mobile
sosButton.addEventListener("mousedown", startHold);
sosButton.addEventListener("touchstart", startHold);

window.addEventListener("mouseup", cancelHold);
window.addEventListener("touchend", cancelHold);
