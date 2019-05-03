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
	function keyPressClose(event) {
		// escape button
		if (event.keyCode === 27) {
			// eslint-disable-next-line no-use-before-define
			close();
		}
	}

	function clickOutside(event) {
		const targetSection = event.target.closest('.modal__dialog');
		if (!targetSection) {
			// eslint-disable-next-line no-use-before-define
			close();
		}
	}

	function open() {
		if (!data.menuScript) {
			downloadMenu();
		}
		modalToggle();
		focusTrap.add('dialog');

		window.addEventListener('keydown', keyPressClose);
		elements.modal.addEventListener('click', clickOutside);
	}

	function close() {
		modalToggle();
		focusTrap.remove('dialog');

		window.removeEventListener('keydown', keyPressClose);
		elements.modal.removeEventListener('click', clickOutside);
	}

	return {
		open,
		close
	};
}());