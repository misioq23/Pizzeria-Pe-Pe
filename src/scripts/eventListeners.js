import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import { scrollEvents, refreshHeader } from './modules/scroll';
import scrollTo from './modules/scrollTo';
import modal from './modules/modal';
import burger from './modules/burger';
import { elements } from './config';
import { calculatePositions } from './base';

export default function eventListener() {
	document.addEventListener('DOMContentLoaded', () => {
		const positions = {};
		positions['state'] = calculatePositions();

		window.addEventListener('resize', debounce(() => {
			positions['state'] = calculatePositions();
			// window.pageYOffset not positions.state.actualPosition because it doesn't refresh positions
			refreshHeader(window.pageYOffset, positions.state.mainSections[0].end);
			burger.deactivate();
		}, 500));

		elements.burger.addEventListener('click', burger.toggle);
		elements.navbar.addEventListener('click', scrollTo);

		// Modal
		elements.heroBtn.addEventListener('click', modal);
		elements.offerBtn.addEventListener('click', modal);
		elements.modalClose.addEventListener('click', modal);

		window.addEventListener('scroll', throttle(() => {
			scrollEvents(positions.state.mainSections, positions.state.mainSections[0].end, positions.state.heroBtnDistanceTop, positions.state.heroBtnFadeStartPosition, positions.state.headlineDistanceTop, positions.state.documentBottom);
		}, 50));
	});
}
