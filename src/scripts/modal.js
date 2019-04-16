import { elements, elementStrings, state } from './config';
import { addFocus, removeFocus } from './functions/focusTrap';
function downloadMenu() {
	const menuScript = document.createElement('script');
	menuScript.src = 'https://pe-pe.skubacz.pl/menu_widget.js';
	document.body.appendChild(menuScript);
}

export default function modal() {
	if (!state.menuScript) {
		downloadMenu();
		state.menuScript = !state.menuScript;
	}
	state.modal = !state.modal;
	elements.body.classList.toggle(elementStrings.modalOpen);
	elements.modal.classList.toggle(elementStrings.modalShow);
	if (state.modal) {
		removeFocus();
		elements.main.setAttribute('aria-hidden', true);
	} else {
		addFocus();
		elements.main.removeAttribute('aria-hidden', true);
	}
}
