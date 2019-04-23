import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import burger from './modules/burger';
import scrollTo from './modules/scrollTo';
import sections from './sections';
import controller from './modules/controller';
import { modal } from './modules/modal';
import { elements } from './config';

export default function eventListener() {
	document.addEventListener('DOMContentLoaded', () => {
		// Scroll init
		const scroll = controller();
		scroll.calculatePositions();
		// Navbar Click
		elements.navbar.addEventListener('click', scrollTo);
		elements.burger.addEventListener('click', burger.toggle);
		// Modal
		elements.heroBtn.addEventListener('click', modal.open);
		elements.offerBtn.addEventListener('click', modal.open);
		elements.modalClose.addEventListener('click', modal.close);

		window.addEventListener('resize', debounce(() => {
			scroll.calculatePositions();
			// navbar color update needed
			burger.deactivate();
		}, 500));

		window.addEventListener('scroll', throttle(() => {
			scroll.scroll();
		}, 20));
		window.addEventListener('scroll', debounce(() => {
			// Data address for window.location and scrollSpy
			sections.checkSectionPosition(window.pageYOffset);
		}, 80));
	});
}
