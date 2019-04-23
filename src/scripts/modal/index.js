import { elements, elementStrings } from '../config';
import { focusTrap } from '../functions/focusTrap';

export default (function() {
	const data = {
		modalOpen: false,
		menuScript: false,
	};
	function downloadMenu() {
		const menuScript = document.createElement('script');
		menuScript.src = 'https://pe-pe.skubacz.pl/menu_widget.js';
		document.body.appendChild(menuScript);
		data.menuScript = !data.menuScript;
	}
	function modalToggle() {
		data.modalOpen = !data.modalOpen;
		elements.body.classList.toggle(elementStrings.modalOpen);
		elements.modal.classList.toggle(elementStrings.modalShow);
		elements.main.setAttribute('aria-hidden', data.modalOpen);
	}
	return {
		open() {
			if (!data.menuScript) {
				downloadMenu();
			}
			modalToggle();
			focusTrap.add('dialog');
		},
		close() {
			modalToggle();
			focusTrap.remove('dialog');
		}
	};
}());
