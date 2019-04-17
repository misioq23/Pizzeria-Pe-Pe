import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import { scrollEvents, refreshHeader } from './modules/scroll';
import scrollTo from './modules/scrollTo';
import modal from './modules/modal';
import { burgerToggle, deactiveBurger } from './modules/burgerToggle';
import { elements } from './config';
import { calculatePositions } from './base';
export default function eventListener() {
	document.addEventListener('DOMContentLoaded', () => {
		const positions = {};
		positions['state'] = calculatePositions();

		window.addEventListener('resize', debounce(() => {
			positions['state'] = calculatePositions();
			refreshHeader(positions.state.actualPosition, positions.state.mainSections[0].end);
			deactiveBurger();
		}, 500));

		elements.burger.addEventListener('click', burgerToggle);
		elements.navbar.addEventListener('click', scrollTo);

		// Modal
		elements.heroBtn.addEventListener('click', modal);
		elements.offerBtn.addEventListener('click', modal);
		elements.modalClose.addEventListener('click', modal);

		window.addEventListener('scroll', throttle(() => {
			scrollEvents(positions.state.mainSections, positions.state.mainSections[0].end, positions.state.heroBtnDistanceTop, positions.state.heroBtnFadeStartPosition, positions.state.headlineDistanceTop);
		}, 50));
	});
}
