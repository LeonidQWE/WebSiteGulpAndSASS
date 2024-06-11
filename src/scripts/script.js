// Elements
const openBurgerMenuBtnElement = document.getElementById('openBurgerMenuBtn');
const closeBurgerMenuBtnElement = document.getElementById('closeBurgerMenuBtn');

// Listeners
openBurgerMenuBtnElement.addEventListener('click', handleClickOpenMenu);
closeBurgerMenuBtnElement.addEventListener('click', handleClickCloseMenu);

// Functions
function handleClickOpenMenu() {
  toggleClassess();
}

function handleClickCloseMenu() {
  toggleClassess();
}

// Helpers
function toggleClassess() {
  const burgerMenuElement = document.getElementById('burgerMenu');
  const bodyElement = document.getElementsByTagName('body')[0];
  burgerMenuElement.classList.toggle('burger__menu_display-block');
  bodyElement.classList.toggle('hidden');
}
