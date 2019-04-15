import throttle from 'lodash/throttle';
import { elements, elementStrings } from './config';

function opacityDecrease(actualPosition, elementDistanceFromTop, startFadingPosition = 0) {
	const opacity = (1 - ((actualPosition - startFadingPosition) / (elementDistanceFromTop - startFadingPosition))).toFixed(2);
	// prevent e.g. opacity = 1.05;
	return Math.min(1, opacity);
}

function refreshHeader(actualPosition, checkpoint) {
	if (actualPosition < checkpoint) {
		elements.navbar.classList.remove(elementStrings.navbarActive);
		// Parallax
		elements.heroParallax.style.transform = `translateY(-${(actualPosition / 3).toFixed()}px)`;
	} else {
		elements.navbar.classList.add(elementStrings.navbarActive);
	}
}

export default function navbarScroll() {
	const actualPosition = window.pageYOffset;
	const heroEndCheckpoint = elements.hero.offsetHeight - elements.navbar.offsetHeight;
	// Actual window position + headline distance to top of window + (visual improvment: half of headline height)
	const headlineDistanceTop = actualPosition + elements.headline.getBoundingClientRect().top + (elements.headline.offsetHeight / 2);
	const heroBtnDistanceTop = actualPosition + elements.heroBtn.getBoundingClientRect().top;
	const heroBtnFadeStartPosition = heroBtnDistanceTop / 2;
	refreshHeader(actualPosition, heroEndCheckpoint);
	const scrollEvents = () => {
		const actualPosition = window.pageYOffset;

		// Navbar change color & Parallax
		refreshHeader(actualPosition, heroEndCheckpoint);

		// Fading Headline
		actualPosition < headlineDistanceTop ? elements.headline.style.opacity = `${opacityDecrease(actualPosition, headlineDistanceTop)}` : elements.headline.style.opacity = '0';

		// Fading Call to Action
		actualPosition < heroBtnDistanceTop ? elements.heroBtn.style.opacity = `${opacityDecrease(actualPosition, heroBtnDistanceTop, heroBtnFadeStartPosition)}` : elements.heroBtn.style.opacity = '0';
	};

	window.addEventListener('scroll', throttle(scrollEvents, 10));
}
