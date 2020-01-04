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
	cookie: document.querySelector('.cookie'),
	navLinks: document.querySelectorAll('.nav__link'),
	sectionCheckpoints: document.querySelectorAll('[data-checkpoint]'),
};

const elementStrings = {
	burgerActive: 'burger--active',
	navbarActive: 'navbar--scroll',
	navLinkActive: 'nav__link--active',
	modalOpen: 'modal--open',
	modalShow: 'modal--show',
	cookieBtn: 'cookie__btn',

};

export { elements, elementStrings };
