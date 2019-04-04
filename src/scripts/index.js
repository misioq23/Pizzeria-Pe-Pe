import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

const navbar = document.querySelector('.navbar');
const burger = document.querySelector('.burger');
const hero = document.querySelector('.hero');
const heroParallax = document.querySelector('.hero__parallax-img');
const navbarHeight = navbar.offsetHeight;

function navbarScroll() {
	const heroHeight = hero.getBoundingClientRect().height - navbarHeight;

	window.addEventListener('scroll', throttle(() => {
		if (window.pageYOffset < heroHeight) {
			navbar.classList.remove('js-navbar--scroll');
			heroParallax.style.transform = `translateY(-${window.pageYOffset / 3}px)`;
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
