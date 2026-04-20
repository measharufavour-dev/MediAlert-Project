// const hamburger = document.getElementById("hamburger");
// const navLinks = document.getElementById("nav-links");

// hamburger.addEventListener("click", () => {
// This adds or removes the 'active' class on every click
//   navLinks.classList.toggle("active");
// });

// ///////////////////
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  // Toggles 'active' on BOTH the menu and the hamburger icon
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});
