import debounce from 'lodash/debounce';
import navbarScroll from './scroll';
import config from './config';

document.addEventListener('DOMContentLoaded', () => {
	navbarScroll();
});

window.addEventListener('resize', debounce(() => {
	navbarScroll();
}, 500));

config.DOM.burger.addEventListener('click', () => {
	config.DOM.navbar.classList.toggle('js-navbar__burger--active');
});
