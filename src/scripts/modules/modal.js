import { elements, elementStrings } from '../config';
import { focusTrap } from '../functions/focusTrap';
const state = {
	modalOpen: false,
	menuScript: false,
};
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
	state.modalOpen = !state.modalOpen;
	elements.body.classList.toggle(elementStrings.modalOpen);
	elements.modal.classList.toggle(elementStrings.modalShow);
	if (state.modalOpen) {
		focusTrap.add('dialog');
		elements.main.removeAttribute('aria-hidden', true);
	} else {
		focusTrap.remove('dialog');
		elements.main.setAttribute('aria-hidden', true);
	}
}
