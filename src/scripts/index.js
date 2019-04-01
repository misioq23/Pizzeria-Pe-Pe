import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

const navbar = document.querySelector('.navbar');
const burger = document.querySelector('.burger');
const masthead = document.querySelector('.masthead');
const navbarHeight = navbar.offsetHeight;

function navbarScroll() {
	const mastheadHeight = masthead.scrollHeight - navbarHeight;

	window.addEventListener('scroll', throttle(() => {
		if (window.pageYOffset > mastheadHeight) {
			navbar.classList.add('js-navbar--scroll');
		} else {
			navbar.classList.remove('js-navbar--scroll');
		}
	}, 100));
}

window.addEventListener('resize', debounce(() => {
	navbarScroll();
}, 500));

document.addEventListener('DOMContentLoaded', () => {
	navbarScroll();
});

burger.addEventListener('click', () => {
	navbar.classList.toggle('js-navbar__burger--active');
});
