import { elements } from '../config';
import { addressChange } from '../functions/addressChange';
import { scrollSpy } from '../functions/scrollSpy';
export default (function(elementsList) {
	const data = {
		sectionsArray: Array.prototype.slice.call(elementsList),
	};
	// return #name string
	function findScrollCheckpoint(actualPosition) {
		for (const el of data.checkpoints) {
			if (actualPosition < data.documentTopHeight && el.start <= actualPosition && actualPosition < el.end) {
				return el.name;
			}
		}
		return data.checkpoints[data.checkpoints.length - 1].name;
	}

	function updateLayout() {
		data.previousCheckpoint = data.actualCheckpoint;
		// Scroll Spy
		scrollSpy.spy(data.actualCheckpoint);
		// Change location address
		addressChange(data.actualCheckpoint);
	}

	return {
		calcSectionsPosition(actualPosition) {
			// Top of window postion at the end of document
			data.documentTopHeight = Math.floor(elements.body.getBoundingClientRect().height - window.innerHeight);
			// Array of checkpoint objects
			data.checkpoints = data.sectionsArray.map((el) => {
				return {
					name: el.dataset.checkpoint,
					start: el.getBoundingClientRect().top + actualPosition - elements.navbar.offsetHeight,
					end: el.getBoundingClientRect().bottom + actualPosition - elements.navbar.offsetHeight,
				};
			});

			data.actualCheckpoint = findScrollCheckpoint(actualPosition);
			updateLayout();
		},

		checkSectionPosition(actualPosition) {
			data.actualCheckpoint = findScrollCheckpoint(actualPosition);
			if (data.previousCheckpoint !== data.actualCheckpoint) {
				updateLayout();
			}
		}
	};
}(elements.sectionCheckpoints));
