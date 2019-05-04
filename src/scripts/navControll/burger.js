import focusTrap from '../focusTrap';
import { elements, elementStrings } from '../config';

const burger = (function() {
	const data = {
		navOpen: false,
	};

	const trapToggle = () => {
		focusTrap.trapToggle(focusTrap.findElements(elements.main), data.navOpen);
	};
	const ariaExpanded = () => {
		elements.burger.setAttribute('aria-expanded', data.navOpen);
	};
	const burgerToggle = () => {
		data.navOpen = !data.navOpen;
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

