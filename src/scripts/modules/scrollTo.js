import smoothScroll from '../functions/smoothScroll';
function scrollTo(event) {
	event.preventDefault();
	const targetSection = event.target.dataset.target;
	if (typeof targetSection !== 'undefined') {
		const destinationSection = document.querySelector(`.${targetSection}`);
		smoothScroll(destinationSection);
	}
};

export default scrollTo;
