import debounce from 'lodash/debounce';
import navbarScroll from './scroll';
import scrollTo from './modules/scrollTo';
import modal from './modal';
import burgerToggle from './modules/burgerToggle';
import { elements, elementStrings } from './config';
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

	elements.burger.addEventListener('click', burgerToggle);
	elements.navbar.addEventListener('click', scrollTo);

	// Modal
	elements.heroBtn.addEventListener('click', modal);
	elements.offerBtn.addEventListener('click', modal);
	elements.modalClose.addEventListener('click', modal);
}
