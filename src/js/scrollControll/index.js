import parallax from './parallax';
import opacityPrint from './opacity';
import { navbarColor } from './navbar';

import { elements } from '../config';

export default (function() {
	const data = {};
	function navbarColorCheckpoint(actualPosition) {
		return actualPosition > data.elements.heroSection ? true : false;
	}
	return {
		calculatePositions(startPos) {
			data.elements = {
				headlineDistanceTop: Math.floor(startPos + elements.headline.getBoundingClientRect().top + (elements.headline.offsetHeight / 2)),
				heroBtnDistanceTop: Math.floor(startPos + elements.heroBtn.getBoundingClientRect().top),
				heroSection: elements.hero.getBoundingClientRect().bottom + startPos - elements.navbar.offsetHeight,
			};
			data.elements.heroBtnFadeStartPosition = Math.floor(data.elements.heroBtnDistanceTop / 2);

			data.navbarState = {
				actual: navbarColorCheckpoint(startPos),
			};
			data.navbarState.previous = data.navbarState.actual;

			// Updating parallax position
			navbarColor(data.navbarState.actual);
			parallax(startPos);

		},
		scroll() {
			// 1. Actual Position
			const actualPosition = window.pageYOffset;
			// Check navbar position
			data.navbarState.actual = navbarColorCheckpoint(actualPosition);
			// 3. Navbar change color
			if (data.navbarState.actual !== data.navbarState.previous) {
				navbarColor(data.navbarState.actual);
				data.navbarState.previous = data.navbarState.actual;
			}
			if (!data.navbarState.actual) {
				// 4. Parallax
				parallax(actualPosition);
				// 5. Fading Headline
				elements.headline.style.opacity = opacityPrint(actualPosition, data.elements.headlineDistanceTop);
				// 6. Fading Call to Action
				elements.heroBtn.style.opacity = opacityPrint(actualPosition, data.elements.heroBtnDistanceTop, data.elements.heroBtnFadeStartPosition);
			}
		},
	};
}());
