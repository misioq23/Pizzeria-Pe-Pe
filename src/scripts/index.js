import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

const navbar = document.querySelector('.navbar');
const burger = document.querySelector('.burger');
const hero = document.querySelector('.hero');
const heroParallax = document.querySelector('.hero__parallax');
const navbarHeight = navbar.offsetHeight;

function navbarScroll() {
	const heroHeight = hero.getBoundingClientRect().height - navbarHeight;

	window.addEventListener('scroll', throttle(() => {
		const actualPosition = window.pageYOffset;
		if (actualPosition < heroHeight) {
			navbar.classList.remove('js-navbar--scroll');
			heroParallax.style.transform = `translateY(-${(actualPosition / 3).toFixed()}px)`;
		} else {
			navbar.classList.add('js-navbar--scroll');
		}
	}, 10));
}

window.addEventListener('resize', debounce(() => {
	navbarScroll();
}, 500));

document.addEventListener('DOMContentLoaded', () => {
	navbarScroll();
});

burger.addEventListener('click', () => {
	navbar.classList.toggle('js-navbar__burger--active');
});
