import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import burger from './modules/burger';
import scrollTo from './modules/scrollTo';
import controller from './modules/controller';
import modal from './modules/modal';
import { elements } from './config';

export default function eventListener() {
	document.addEventListener('DOMContentLoaded', () => {
		const scroll = controller();
		scroll.calculatePositions();
		elements.navbar.addEventListener('click', scrollTo);
		elements.burger.addEventListener('click', burger.toggle);
		// Modal
		elements.heroBtn.addEventListener('click', modal);
		elements.offerBtn.addEventListener('click', modal);
		elements.modalClose.addEventListener('click', modal);

		window.addEventListener('resize', debounce(() => {
			scroll.calculatePositions();
			burger.deactivate();
			// navbar and parallax update needed
		}, 500));

		window.addEventListener('scroll', throttle(() => {
			scroll.scroll();
		}, 10));
	});
}
