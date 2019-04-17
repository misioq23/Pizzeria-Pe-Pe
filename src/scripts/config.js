const elements = {
	body: document.querySelector('body'),
	navbar: document.querySelector('.navbar'),
	burger: document.querySelector('.burger'),
	main: document.querySelector('.main'),
	hero: document.querySelector('.hero'),
	heroParallax: document.querySelector('.hero__parallax'),
	headline: document.querySelector('.headline'),
	heroBtn: document.querySelector('.hero__btn--cta'),
	offerBtn: document.querySelector('.offer__btn'),
	modal: document.querySelector('.modal'),
	modalClose: document.querySelector('.modal__close'),
};

const elementStrings = {
	burgerActive: 'burger--active',
	navbarActive: 'navbar--scroll',
	modalOpen: 'modal--open',
	modalShow: 'modal--show',
};

const state = {
	modal: false,
	menuScript: false,
};

export { elements, elementStrings, state };
