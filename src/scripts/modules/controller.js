import { getSectionPositions, findScrollCheckpoint, addressChange } from '../functions/addressChange';
import { parallax, opacityPrint } from '../functions/hero';
import { navbarColor } from '../functions/navbar';
import { scrollSpy } from '../functions/scrollSpy';
import { elements } from '../config';

const controller = () => {
	const data = {};

	return {
		calculatePositions() {
			data.startPos = window.pageYOffset;
			data.sections = getSectionPositions(data.startPos);
			data.elements = {
				headlineDistanceTop: Math.floor(data.startPos + elements.headline.getBoundingClientRect().top + (elements.headline.offsetHeight / 2)),
				heroBtnDistanceTop: Math.floor(data.startPos + elements.heroBtn.getBoundingClientRect().top),
				documentTopHeight: Math.floor(elements.body.getBoundingClientRect().height - window.innerHeight),
			};
			data.elements.heroBtnFadeStartPosition = Math.floor(data.elements.heroBtnDistanceTop / 2);
			data.navbarState = {
				actual: data.startPos > data.sections[0].end ? 'true' : 'false'
			};
			data.navbarState.previous = data.navbarState.actual;
			data.addressState = {
				actual: window.location.hash
			};
			// Updating parallax position
			parallax(data.startPos);
		},
		scroll() {
			// 1. Actual Position
			const actualPosition = window.pageYOffset;
			// 2. Change location address
			data.addressState.actual = findScrollCheckpoint(data.sections, actualPosition, data.elements.documentTopHeight);
			if (data.addressState.previous !== data.addressState.actual) {
				data.addressState.previous = data.addressState.actual;
				scrollSpy.spy(data.addressState.actual);
				addressChange(data.addressState.actual);
			}
			data.navbarState.actual = actualPosition > data.sections[0].end ? true : false;
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
		printData() {
			return data;
		}
	};
};
export default controller;
