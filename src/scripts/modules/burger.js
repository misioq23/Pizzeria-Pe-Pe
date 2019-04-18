import { elements, elementStrings } from '../config';

const burgerFactory = () => {
	const data = {
		navOpen: false
	};
	return {
		toggle() {
			data.navOpen = !data.navOpen;
			elements.navbar.classList.toggle(elementStrings.burgerActive);
			elements.burger.setAttribute('aria-expanded', data.navOpen);
		},
		// e.g. deactivate manu on resize event
		deactivate() {
			if (data.navOpen) {
				elements.navbar.classList.toggle(elementStrings.burgerActive);
				data.navOpen = !data.navOpen;
			}
		}
	};
};

const burger = burgerFactory();

export default burger;

