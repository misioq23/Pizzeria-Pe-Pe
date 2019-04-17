import { adressChange } from '../functions/adressChange';
import { elements, elementStrings } from '../config';

function opacityDecrease(actualPosition, elementDistanceFromTop, startFadingPosition = 0) {
	const opacity = (1 - ((actualPosition - startFadingPosition) / (elementDistanceFromTop - startFadingPosition))).toFixed(2);
	// prevent e.g. opacity = 1.05;
	return Math.min(1, opacity);
}

export function refreshHeader(actualPosition, checkpoint) {
	if (actualPosition < checkpoint) {
		elements.navbar.classList.remove(elementStrings.navbarActive);
		// Parallax
		elements.heroParallax.style.transform = `translateY(-${(actualPosition / 3).toFixed()}px)`;
	} else {
		elements.navbar.classList.add(elementStrings.navbarActive);
	}
}

export function scrollEvents(dataAnchors, heroEndCheckpoint, heroBtnDistanceTop, heroBtnFadeStartPosition, headlineDistanceTop, documentBottom) {
	const actualPosition = window.pageYOffset;
	adressChange(dataAnchors, actualPosition, documentBottom);
	// Navbar change color & Parallax
	refreshHeader(actualPosition, heroEndCheckpoint);

	// Fading Headline
	actualPosition < headlineDistanceTop ? elements.headline.style.opacity = `${opacityDecrease(actualPosition, headlineDistanceTop)}` : elements.headline.style.opacity = '0';

	// Fading Call to Action
	actualPosition < heroBtnDistanceTop ? elements.heroBtn.style.opacity = `${opacityDecrease(actualPosition, heroBtnDistanceTop, heroBtnFadeStartPosition)}` : elements.heroBtn.style.opacity = '0';

}
