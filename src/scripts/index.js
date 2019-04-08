import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import config from './config';

function navbarScroll() {
	const heroEndCheckpoint = config.DOM.hero.getBoundingClientRect().height - config.DOM.navbar.offsetHeight;
	// Actual window position + headline distance to top of window + (visual improvment: half of headline height)
	const headlineDistanceTop = (window.pageYOffset + config.DOM.headline.getBoundingClientRect().top + (config.DOM.headline.getBoundingClientRect().height) / 2);
	const heroBtnDistanceTop = (window.pageYOffset + config.DOM.heroBtn.getBoundingClientRect().top);
	const heroBtnCheckpoint = heroBtnDistanceTop / 2;

	const scrollEvents = () => {
		const actualPosition = window.pageYOffset;
		if (actualPosition < heroEndCheckpoint) {
			config.DOM.navbar.classList.remove('js-navbar--scroll');
			// Parallax
			config.DOM.heroParallax.style.transform = `translateY(-${(actualPosition / 3).toFixed()}px)`;
		} else {
			config.DOM.navbar.classList.add('js-navbar--scroll');
		}
		// Fading Headline
		actualPosition < headlineDistanceTop ? config.DOM.headline.style.opacity = `${(1 - (actualPosition / headlineDistanceTop)).toFixed(2)}` : config.DOM.headline.style.opacity = '0';
		// Fading Call to Action
		if (actualPosition > heroBtnDistanceTop) {
			config.DOM.heroBtn.style.opacity = '0';
		} else if (actualPosition > heroBtnCheckpoint) {
			config.DOM.heroBtn.style.opacity = `${(1 - ((actualPosition - heroBtnCheckpoint) / heroBtnCheckpoint)).toFixed(2)}`;
		} else {
			config.DOM.heroBtn.style.opacity = '1';
		}
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
