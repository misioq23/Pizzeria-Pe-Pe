import smoothScroll from '../functions/smoothScroll';
import burger from './burger';
function scrollTo(event) {
	event.preventDefault();
	const targetSection = event.target.dataset.target;
	if (typeof targetSection !== 'undefined') {
		const destinationSection = document.querySelector(`.${targetSection}`);
		smoothScroll(destinationSection);
		burger.deactivate();
	}
};

export default scrollTo;
