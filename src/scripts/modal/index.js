import { elements, elementStrings } from '../config';
import focusTrap from '../focusTrap';
import sections from '../sections';

export default (function() {
	const data = {
		modalOpen: false,
		// checks is menu active
		menuScript: false,
		// btn clicked to open menu
		focusElement: '',
	};
	function _downloadMenu() {
		const menuScript = document.createElement('script');
		menuScript.src = 'https://pe-pe.skubacz.pl/menu_widget.js';
		document.body.appendChild(menuScript);
		data.menuScript = !data.menuScript;
	}
	function _modalToggle() {
		data.modalOpen = !data.modalOpen;
		elements.body.classList.toggle(elementStrings.modalOpen);
		elements.modal.classList.toggle(elementStrings.modalShow);
		elements.main.setAttribute('aria-hidden', data.modalOpen);
	}
	function _keyPressClose(event) {
		// escape button
		if (event.keyCode === 27) {
			// eslint-disable-next-line no-use-before-define
			close();
		}
	}
	function _clickOutside(event) {
		const targetSection = event.target.closest('.modal__dialog');
		if (!targetSection) {
			// eslint-disable-next-line no-use-before-define
			close();
		}
	}
	function _modalFocusTrap() {
		const navbarFocus = focusTrap.findElements(elements.navbar);
		const mainFocus = focusTrap.findElements(elements.main);
		const allFocus = navbarFocus.concat(mainFocus);
		focusTrap.trapToggle(allFocus, data.modalOpen);
	}

	function _disableBtn() {
		if (data.modalOpen) {
			data.focusElement = document.activeElement;
			data.focusElement.blur();
		} else {
			data.focusElement.focus();
		}
	}

	function open() {
		if (!data.menuScript) {
			_downloadMenu();
		}
		_modalToggle();
		// save & disable clicked button which opens modal
		_disableBtn();
		// focus trap on whole page
		_modalFocusTrap();
		// change address bar
		sections.checkSectionPosition('#menu');
		// add close eventListeners
		window.addEventListener('keydown', _keyPressClose);
		elements.modal.addEventListener('click', _clickOutside);
		// eslint-disable-next-line no-use-before-define
		elements.modalClose.addEventListener('click', close);
	}

	function close() {
		_modalToggle();
		// enable clicked button which opens modal
		_disableBtn();
		// remove focus trap on whole page
		_modalFocusTrap();
		// change address bar
		sections.checkSectionPosition(window.pageYOffset);
		// remove close eventListeners
		window.removeEventListener('keydown', _keyPressClose);
		elements.modal.removeEventListener('click', _clickOutside);
		elements.modalClose.removeEventListener('click', close);
	}

	return {
		open,
		close
	};
}());
