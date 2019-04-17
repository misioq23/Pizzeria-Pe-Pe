import debounce from 'lodash/debounce';
import navbarScroll from './scroll';
import smoothScroll from './smoothScroll';
import modal from './modal';
import { elements, elementStrings, state } from './config';
export default function eventListener() {
	document.addEventListener('DOMContentLoaded', () => {
		navbarScroll();
	});

	window.addEventListener('resize', debounce(() => {
		navbarScroll();
		if (elements.navbar.classList.contains(elementStrings.burgerActive)) {
			elements.navbar.classList.toggle(elementStrings.burgerActive);
		}
	}, 500));

	// Smooth scroll
	const handleClick = (event) => {
		event.preventDefault();
		const targetSection = event.target.dataset.target;
		if (typeof targetSection !== 'undefined') {
			const destinationSection = document.querySelector(`.${targetSection}`);
			smoothScroll(destinationSection);
		}
	};

	const burgerToggle = () => {
		state.burger = !state.burger;
		elements.navbar.classList.toggle(elementStrings.burgerActive);
		elements.burger.setAttribute('aria-expanded', state.burger);
	};

	elements.burger.addEventListener('click', burgerToggle);
	elements.navbar.addEventListener('click', handleClick);

	// Modal
	elements.heroBtn.addEventListener('click', modal);
	elements.offerBtn.addEventListener('click', modal);
	elements.modalClose.addEventListener('click', modal);
}
