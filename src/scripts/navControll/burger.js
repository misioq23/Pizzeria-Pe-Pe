import { focusTrap } from '../functions/focusTrap';
import { elements, elementStrings } from '../config';

const burger = (function() {
	const data = {
		navOpen: false,
		trap: false
	};

	const trapToggle = () => {
		data.trap = !data.trap;
		data.trap ? focusTrap.add('') : focusTrap.remove('');
	};
	const ariaExpanded = () => {
		data.navOpen = !data.navOpen;
		elements.burger.setAttribute('aria-expanded', data.navOpen);
	};
	const burgerToggle = () => {
		trapToggle();
		ariaExpanded();
		elements.navbar.classList.toggle(elementStrings.burgerActive);
	};

	return {
		toggle() {
			burgerToggle();
		},
		// e.g. deactivate menu on resize event
		deactivate() {
			if (data.navOpen) {
				burgerToggle();
			}
		}
	};
}());

export default burger;

