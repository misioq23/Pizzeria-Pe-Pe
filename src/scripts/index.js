import debounce from 'lodash/debounce';
import navbarScroll from './scroll';
import smoothScroll from './smoothScroll';
import { elements, elementStrings, state } from './config';
import modal from './modal';

document.addEventListener('DOMContentLoaded', () => {
	navbarScroll();
});

window.addEventListener('resize', debounce(() => {
	navbarScroll();
	if (elements.navbar.classList.contains(elementStrings.burgerActive)) {
		elements.navbar.classList.toggle(elementStrings.burgerActive);
	}
}, 500));

elements.burger.addEventListener('click', () => {
	state.burger = !state.burger;
	elements.navbar.classList.toggle(elementStrings.burgerActive);
	elements.burger.setAttribute('aria-expanded', state.burger);

});
// Smooth scroll
const handleClick = (event) => {
	event.preventDefault();
	const targetSection = event.target.dataset.target;
	if (typeof targetSection !== 'undefined') {
		const destinationSection = document.querySelector(`.${targetSection}`);
		smoothScroll(destinationSection);
	}
};

elements.navbar.addEventListener('click', handleClick);
