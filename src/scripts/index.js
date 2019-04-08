import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import config from './config';

function opacityDecrease(actualPosition, elementDistanceFromTop, startFadingPosition = 0) {
	const opacity = (1 - ((actualPosition - startFadingPosition) / (elementDistanceFromTop - startFadingPosition))).toFixed(2);
	// prevent e.g. opacity = 1.05;
	return Math.min(1, opacity);
}

function navbarScroll() {
	const heroEndCheckpoint = config.DOM.hero.offsetHeight - config.DOM.navbar.offsetHeight;
	// Actual window position + headline distance to top of window + (visual improvment: half of headline height)
	const headlineDistanceTop = window.pageYOffset + config.DOM.headline.getBoundingClientRect().top + (config.DOM.headline.offsetHeight / 2);
	const heroBtnDistanceTop = window.pageYOffset + config.DOM.heroBtn.getBoundingClientRect().top;
	const heroBtnFadeStartPosition = heroBtnDistanceTop / 2;

	const scrollEvents = () => {
		const actualPosition = window.pageYOffset;
		
		// Navbar change color & Parallax
		if (actualPosition < heroEndCheckpoint) {
			config.DOM.navbar.classList.remove('js-navbar--scroll');
			// Parallax
			config.DOM.heroParallax.style.transform = `translateY(-${(actualPosition / 3).toFixed()}px)`;
		} else {
			config.DOM.navbar.classList.add('js-navbar--scroll');
		}

		// Fading Headline
		actualPosition < headlineDistanceTop ? config.DOM.headline.style.opacity = `${opacityDecrease(actualPosition, headlineDistanceTop)}` : config.DOM.headline.style.opacity = '0';

		// Fading Call to Action
		actualPosition < heroBtnDistanceTop ? config.DOM.heroBtn.style.opacity = `${opacityDecrease(actualPosition, heroBtnDistanceTop, heroBtnFadeStartPosition)}` : config.DOM.heroBtn.style.opacity = '0';
	};

	window.addEventListener('scroll', throttle(scrollEvents, 10));
}

document.addEventListener('DOMContentLoaded', () => {
	navbarScroll();
});

window.addEventListener('resize', debounce(() => {
	navbarScroll();
}, 500));

config.DOM.burger.addEventListener('click', () => {
	config.DOM.navbar.classList.toggle('js-navbar__burger--active');
});
