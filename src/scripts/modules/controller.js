import { getSectionPositions, findScrollCheckpoint, addressChange } from '../functions/addressChange';
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
		},
		scroll() {
			// 1. Actual Position
			const actualPosition = window.pageYOffset;
			// 2. Change location address
			data.addressState.actual = findScrollCheckpoint(data.sections, actualPosition, data.elements.documentTopHeight);
			if (data.addressState.previous !== data.addressState.actual) {
				data.addressState.previous = data.addressState.actual;
				addressChange(data.addressState.actual);
			}
			// // 3. Navbar change color & Parallax
			// refreshHeader(actualPosition, heroEndCheckpoint);
			// // 4. Fading Headline
			// elements.headline.style.opacity = actualPosition < headlineDistanceTop ? `${opacityDecrease(actualPosition, headlineDistanceTop)}` : '0';
			// // 5. Fading Call to Action
			// elements.heroBtn.style.opacity = actualPosition < heroBtnDistanceTop ? `${opacityDecrease(actualPosition, heroBtnDistanceTop, heroBtnFadeStartPosition)}` : '0';
			// // 6. Change address
		},
		printData() {
			return data;
		}
	};
};
export default controller;
