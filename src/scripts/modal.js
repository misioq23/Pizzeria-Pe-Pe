import { elements, elementStrings, state } from './config';
function focusAble(element) {
	const focusable = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
	return Array.prototype.slice.call(focusable);
}

const allFocus = focusAble(elements.main).concat(focusAble(elements.navbar));

function addFocus() {
	allFocus.forEach((element) => {
		element.removeAttribute('tabindex', -1);
	});
}

function removeFocus() {
	allFocus.forEach((element) => {
		element.setAttribute('tabindex', -1);
	});
}

export default function modal() {
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
