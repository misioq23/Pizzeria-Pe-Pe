import { elements } from '../config';
function adressChange(actualPosition) {
	const index = elements.dataAnchors.starts.findIndex((el, index) => {
		if (el > actualPosition) {
			return index;
		}
	});
	location.replace(`${window.location.origin}/#${elements.dataAnchors.names[index !== -1 ? index - 1 : elements.dataAnchors.names.length - 1]}`);
}

function getSectionPositions(actualPosition) {
	const sections = document.querySelectorAll('[data-anchor]');
	const sectionsArray = Array.prototype.slice.call(sections);
	sectionsArray.forEach((el) => {
		elements.dataAnchors.names.push(el.dataset.anchor);
		elements.dataAnchors.starts.push(el.getBoundingClientRect().top + actualPosition - elements.navbar.offsetHeight);
	});
}

export { getSectionPositions, adressChange };
