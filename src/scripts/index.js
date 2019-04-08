import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

const navbar = document.querySelector('.navbar');
const burger = document.querySelector('.burger');
const hero = document.querySelector('.hero');
const heroParallax = document.querySelector('.hero__parallax');
const headline = document.querySelector('.headline');
const heroBtn = document.querySelector('.hero__btn--cta');
const navbarHeight = navbar.offsetHeight;

function navbarScroll() {
	const heroHeight = hero.getBoundingClientRect().height - navbarHeight;
	// Actual window position + headline distance to top of window + (visual improvment: half of headline height)
	const headlineDistanceTop = (window.pageYOffset + headline.getBoundingClientRect().top + (headline.getBoundingClientRect().height) / 2);
	const heroBtnDistanceTop = (window.pageYOffset + heroBtn.getBoundingClientRect().top);
	const heroBtnCheckpoint = heroBtnDistanceTop / 2;

	const scrollEvents = () => {
		const actualPosition = window.pageYOffset;
		if (actualPosition < heroHeight) {
			navbar.classList.remove('js-navbar--scroll');
			// Parallax
			heroParallax.style.transform = `translateY(-${(actualPosition / 3).toFixed()}px)`;
		} else {
			navbar.classList.add('js-navbar--scroll');
		}
		// Fading Headline
		actualPosition < headlineDistanceTop ? headline.style.opacity = `${(1 - (actualPosition / headlineDistanceTop)).toFixed(2)}` : headline.style.opacity = '0';
		// Fading Call to Action
		if (actualPosition > heroBtnDistanceTop) {
			heroBtn.style.opacity = '0';
		} else if (actualPosition > heroBtnCheckpoint) {
			heroBtn.style.opacity = `${(1 - ((actualPosition - heroBtnCheckpoint) / heroBtnCheckpoint)).toFixed(2)}`;
		} else {
			heroBtn.style.opacity = '1';
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

burger.addEventListener('click', () => {
	navbar.classList.toggle('js-navbar__burger--active');
});
