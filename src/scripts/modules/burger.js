import { trap } from '../functions/focusTrap';
import { elements, elementStrings } from '../config';

const burgerFactory = () => {
	const data = {
		navOpen: false,
		trap: false
	};
	function trapToggle() {
		data.trap ? trap.add('') : trap.remove('');
		data.trap = !data.trap;
	}
	return {
		toggle() {
			data.navOpen = !data.navOpen;
			trapToggle();
			elements.navbar.classList.toggle(elementStrings.burgerActive);
			elements.burger.setAttribute('aria-expanded', data.navOpen);
		},
		// e.g. deactivate menu on resize event
		deactivate() {
			if (data.navOpen) {
				trapToggle();
				elements.navbar.classList.toggle(elementStrings.burgerActive);
				data.navOpen = !data.navOpen;
			}
		}
	};
};

const burger = burgerFactory();

export default burger;

