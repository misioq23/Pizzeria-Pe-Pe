import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import burger from './navControll/burger';
import navControll from './navControll';
import modal from './modules/modal';
import sections from './sections';
import scroll from './scrollControll';
import { elements } from './config';

export default function eventListener() {
	document.addEventListener('DOMContentLoaded', () => {
		// Scroll & section init
		const actualPos = window.pageYOffset;
		scroll.calculatePositions(actualPos);
		sections.calcSectionsPosition(actualPos, elements.sectionCheckpointsArray);
		// Navbar Click
		elements.navbar.addEventListener('click', navControll);
		elements.burger.addEventListener('click', burger.toggle);
		// Modal
		elements.heroBtn.addEventListener('click', modal.open);
		elements.offerBtn.addEventListener('click', modal.open);
		elements.modalClose.addEventListener('click', modal.close);

		window.addEventListener('resize', debounce(() => {
			const actualPos = window.pageYOffset;
			scroll.calculatePositions(actualPos);
			sections.calcSectionsPosition(actualPos, elements.sectionCheckpointsArray);
			// navbar color update needed
			burger.deactivate();
		}, 200));

		window.addEventListener('scroll', throttle(() => {
			scroll.scroll();
		}, 20));
		window.addEventListener('scroll', debounce(() => {
			// Data address for window.location and scrollSpy
			sections.checkSectionPosition(window.pageYOffset);
		}, 80));
	});
}
