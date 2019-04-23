import sections from '../sections';
import { parallax, opacityPrint } from '../functions/hero';
import { navbarColor } from '../functions/navbar';

import { elements } from '../config';

const controller = () => {
	const data = {};

	return {
		calculatePositions() {
			data.startPos = window.pageYOffset;
			data.elements = {
				headlineDistanceTop: Math.floor(data.startPos + elements.headline.getBoundingClientRect().top + (elements.headline.offsetHeight / 2)),
				heroBtnDistanceTop: Math.floor(data.startPos + elements.heroBtn.getBoundingClientRect().top),
				heroSection: elements.hero.getBoundingClientRect().bottom + data.startPos - elements.navbar.offsetHeight,
			};
			data.elements.heroBtnFadeStartPosition = Math.floor(data.elements.heroBtnDistanceTop / 2);
			data.navbarState = {
				actual: data.startPos > data.elements.heroSection ? 'true' : 'false'
			};
			data.navbarState.previous = data.navbarState.actual;
			data.addressState = {
				actual: window.location.hash
			};
			// Updating parallax position
			parallax(data.startPos);
			sections.calcSectionsPosition(data.startPos, elements.sectionCheckpointsArray);
		},
		scroll() {
			// 1. Actual Position
			const actualPosition = window.pageYOffset;
			// Check navbar position
			data.navbarState.actual = actualPosition > data.elements.heroSection ? true : false;
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
		}
	};
};
export default controller;
