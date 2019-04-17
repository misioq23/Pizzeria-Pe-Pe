import { elements } from '../config';

function destinationPosition(element, actualPosition) {
	return element.getBoundingClientRect().top + actualPosition;
}

function getSectionPositions(actualPosition) {
	const sections = document.querySelectorAll('[data-checkpoint]');
	const sectionsArray = Array.prototype.slice.call(sections);
	const dataAnchors = [];
	sectionsArray.forEach((el) => {
		dataAnchors.push(Object.freeze({
			checkpointName: el.dataset.checkpoint,
			start: destinationPosition(el, actualPosition) - elements.navbar.offsetHeight,
			end: el.getBoundingClientRect().bottom + actualPosition - elements.navbar.offsetHeight,
		}));
	});
	return dataAnchors;
}
// Returns '#sectionName'
function findScrollCheckpoint(data, actualPosition, bottom) {
	for (const el of data) {
		if (actualPosition !== bottom && el.start <= actualPosition && actualPosition < el.end) {
			return el.checkpointName;
		}
	}
	return data[data.length - 1].checkpointName;
}

function adressChange(data, actualPosition, bottom) {
	const checkpoint = findScrollCheckpoint(data, actualPosition, bottom);
	history.replaceState('state', 'title', checkpoint !== 'index' ? checkpoint : ' ');
}
export { getSectionPositions, adressChange };
