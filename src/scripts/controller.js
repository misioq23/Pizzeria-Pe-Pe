import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import cookie from './cookie';
import burger from './navControll/burger';
import navControll from './navControll';
import modal from './modal';
import sections from './sections';
import scroll from './scrollControll';
import { elements } from './config';

export default (function() {
	document.addEventListener('DOMContentLoaded', () => {
		// Check cookies
		cookie.createCookie();
		// Scroll & section init
		const actualPos = window.pageYOffset;
		scroll.calculatePositions(actualPos);
		sections.calcSectionsPosition(actualPos, elements.sectionCheckpointsArray);
		// Open modal when address on paste
		if (window.location.hash === '#menu') {
			modal.open();
		}
		// Navbar Click
		elements.navbar.addEventListener('click', navControll);
		elements.burger.addEventListener('click', burger.toggle);
		// Modal
		elements.heroBtn.addEventListener('click', modal.open);
		elements.offerBtn.addEventListener('click', modal.open);

		window.addEventListener('resize', debounce(() => {
			const actualPos = window.pageYOffset;
			scroll.calculatePositions(actualPos);
			// Check address change on resize only when it isn't #menu
			if (window.location.hash !== '#menu') {
				sections.calcSectionsPosition(actualPos, elements.sectionCheckpointsArray);
			}
			burger.deactivate();
		}, 200));

		window.addEventListener('scroll', throttle(() => {
			scroll.scroll();
		}, 15));
		window.addEventListener('scroll', debounce(() => {
			// Data address for window.location and scrollSpy
			sections.checkSectionPosition(window.pageYOffset);
		}, 80));

		window.addEventListener('hashchange', () => {
			// Open modal on change address
			if (location.hash === '#menu') {
				modal.open();
			}
		});
	});
}());
