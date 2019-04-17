import { elements, elementStrings } from '../config';
const state = {
	burgerToggle: false
};
export default function burgerToggle() {
	state.burgerToggle = !state.burgerToggle;
	elements.navbar.classList.toggle(elementStrings.burgerActive);
	elements.burger.setAttribute('aria-expanded', state.burger);
};
