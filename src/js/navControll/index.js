import smoothScroll from './smoothScroll';
import burger from './burger';
function scrollTo(event) {
	event.preventDefault();
	const targetSection = event.target.getAttribute('href');
	if (targetSection) {
		const destination = document.querySelector(targetSection);
		smoothScroll(destination);
		// for mobile disappear
		burger.deactivate();
	}
};

export default scrollTo;
