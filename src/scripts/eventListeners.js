import debounce from 'lodash/debounce';
import navbarScroll from './modules/scroll';
import scrollTo from './modules/scrollTo';
import modal from './modules/modal';
import { burgerToggle, deactiveBurger } from './modules/burgerToggle';
import { elements } from './config';
export default function eventListener() {
	document.addEventListener('DOMContentLoaded', navbarScroll);

	window.addEventListener('resize', debounce(() => {
		navbarScroll();
		deactiveBurger();
	}, 500));

	elements.burger.addEventListener('click', burgerToggle);
	elements.navbar.addEventListener('click', scrollTo);

	// Modal
	elements.heroBtn.addEventListener('click', modal);
	elements.offerBtn.addEventListener('click', modal);
	elements.modalClose.addEventListener('click', modal);
}
