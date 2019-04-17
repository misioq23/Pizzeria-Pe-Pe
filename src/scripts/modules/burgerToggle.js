import { elements, elementStrings } from '../config';
const state = {
	burgerToggle: false
};
export function burgerToggle() {
	state.burgerToggle = !state.burgerToggle;
	elements.navbar.classList.toggle(elementStrings.burgerActive);
	elements.burger.setAttribute('aria-expanded', state.burger);
};

export function deactiveBurger() {
	if (state.burgerToggle) {
		elements.navbar.classList.toggle(elementStrings.burgerActive);
		state.burgerToggle = !state.burgerToggle;
	}
}

