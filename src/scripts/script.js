// Elements
const openMenuBtnElement = document.getElementById('openMenuBtn');
const closeMenuBtnElement = document.getElementById('closeMenuBtn');
const navbarElement = document.getElementById('navbar');
const bodyElement = document.body;

// Listeners
openMenuBtnElement.addEventListener('click', handleClickToggleMenu);
closeMenuBtnElement.addEventListener('click', handleClickToggleMenu);

// Functions
function handleClickToggleMenu() {
  toggleClassess();
}

// Helpers
function toggleClassess() {
  navbarElement.classList.toggle('navbar_active');
  bodyElement.classList.toggle('body_hidden');
}
