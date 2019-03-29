const navbar = document.querySelector('.navbar');
const burger = document.querySelector('.burger');
const masthead = document.querySelector('.masthead');
const navbarHeight = navbar.clientHeight;
window.addEventListener('scroll', () => {
	const mastheadHeight = masthead.scrollHeight - navbarHeight;

	if (window.pageYOffset > mastheadHeight) {
		navbar.classList.add('js-navbar--scroll');
	} else {
		navbar.classList.remove('js-navbar--scroll');
	}
});

burger.addEventListener('click', () => {
	navbar.classList.toggle('js-navbar__burger--active');
});
