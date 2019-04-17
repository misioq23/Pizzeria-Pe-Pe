import { elements } from '../config';

function destinationPosition(element, actualPosition) {
	return element.getBoundingClientRect().top + actualPosition;
}

function getSectionPositions(actualPosition) {
	const sections = document.querySelectorAll('[data-anchor]');
	const sectionsArray = Array.prototype.slice.call(sections);
	const dataAnchors = [];
	sectionsArray.forEach((el) => {
		dataAnchors.push(Object.freeze({
			name: el.dataset.anchor,
			start: destinationPosition(el, actualPosition) - elements.navbar.offsetHeight,
			end: el.getBoundingClientRect().bottom + actualPosition - elements.navbar.offsetHeight,
		}));
	});
	return dataAnchors;
}
// Returns '#sectionName'
function findScrollCheckpoint(data, actualPosition) {
	const windowPositionAtBottom = Math.floor(elements.body.getBoundingClientRect().height - window.innerHeight);
	for (const el of data) {
		if (actualPosition !== windowPositionAtBottom && el.start <= actualPosition && actualPosition < el.end) {
			return el.name;
		}
	}
	return data[data.length - 1].name;
}

function adressChange(data, actualPosition) {
	const checkpoint = findScrollCheckpoint(data, actualPosition);
	history.pushState('state', 'title', checkpoint !== 'index' ? checkpoint : ' ');
}
export { getSectionPositions, adressChange };
