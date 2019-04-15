import debounce from 'lodash/debounce';
import navbarScroll from './scroll';
import smoothScroll from './smoothScroll';
import { elements, elementStrings } from './config';

document.addEventListener('DOMContentLoaded', () => {
	navbarScroll();
});

window.addEventListener('resize', debounce(() => {
	navbarScroll();
}, 500));

elements.burger.addEventListener('click', () => {
	elements.navbar.classList.toggle(elementStrings.burgerActive);
});

const handleClick = (event) => {
	event.preventDefault();
	const targetSection = event.target.dataset.target;
	if (typeof targetSection !== 'undefined') {
		const destinationSection = document.querySelector(`.${targetSection}`);
		smoothScroll(destinationSection);
	}
};

elements.navbar.addEventListener('click', handleClick);
