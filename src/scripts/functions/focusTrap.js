import { elements } from '../config';
function focusAble(element) {
	const focusable = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
	return Array.prototype.slice.call(focusable);
}

function focusTrap() {
	const navbarFocus = focusAble(elements.navbar);
	const mainFocus = focusAble(elements.main);
	const allFocus = navbarFocus.concat(mainFocus);
	return {
		add(array) {
			array === 'dialog' ? array = allFocus : array = mainFocus;
			console.log('hej');
			array.forEach((element) => {
				element.removeAttribute('tabindex', -1);
			});
		},

		remove(array) {
			array === 'dialog' ? array = allFocus : array = mainFocus;
			array.forEach((element) => {
				element.setAttribute('tabindex', -1);
			});
		}
	};
}

export const trap = focusTrap();
