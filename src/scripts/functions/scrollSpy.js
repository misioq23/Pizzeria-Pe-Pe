import { elements, elementStrings } from '../config';
function scrollSpyFactory(spiedElementsCollection) {
	const data = {
		elements: Array.prototype.slice.call(spiedElementsCollection),
	};
	data.targets = data.elements.map((el) => {
		return `#${el.dataset.target}`;
	});
	return {
		spy(actualSection) {
			const index = data.targets.indexOf(actualSection);
			if (data.previous) {
				data.previous.classList.remove(elementStrings.navLinkActive);
			}
			if (index !== -1) {
				data.elements[index].classList.add(elementStrings.navLinkActive);
				data.previous = data.elements[index];
			}
		}
	};
}
export const scrollSpy = scrollSpyFactory(elements.navLinks);
