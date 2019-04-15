import debounce from 'lodash/debounce';
import navbarScroll from './scroll';
import smoothScroll from './smoothScroll';
import config from './config';

document.addEventListener('DOMContentLoaded', () => {
	navbarScroll();
});

window.addEventListener('resize', debounce(() => {
	navbarScroll();
}, 500));

config.DOM.burger.addEventListener('click', () => {
	config.DOM.navbar.classList.toggle('js-navbar__burger--active');
});

const handleClick = (event) => {
	event.preventDefault();
	const targetSection = event.target.dataset.target;
	if (typeof targetSection !== 'undefined') {
		const destinationSection = document.querySelector(`.${targetSection}`);
		smoothScroll(destinationSection);
	}
};

config.DOM.navbar.addEventListener('click', handleClick);
