import { elements, elementStrings } from '../config';
function scrollSpyFactory() {
	const data = {};
	data.btnArr = Array.prototype.slice.call(elements.navLinks);
	data.targetArr = data.btnArr.map((el) => {
		return `#${el.dataset.target}`;
	});
	return {
		spy(actualSection) {
			const index = data.targetArr.indexOf(actualSection);
			if (data.actual) {
				data.actual.classList.remove(elementStrings.navLinkActive);
			}
			if (index !== -1) {
				data.btnArr[index].classList.add(elementStrings.navLinkActive);
				data.actual = data.btnArr[index];
			}
		}
	};
}
export const scrollSpy = scrollSpyFactory();
