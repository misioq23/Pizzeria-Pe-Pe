const nav = document.querySelector('.nav');
const navBurger = document.querySelector('.nav__burger');
document.querySelector('.nav__btn').addEventListener('click', () => {
	nav.classList.toggle('js-nav--active');
	navBurger.classList.toggle('js-nav__burger--active');
});
