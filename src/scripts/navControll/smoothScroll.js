function easeInOutCubic(t) {
	return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

function position(start, end, elapsed, duration) {
	return start + (end - start) * easeInOutCubic(elapsed / duration);
	// delete easeInOutCubic would give a linear scroll
}

function destinationPosition(destination, start) {
	return typeof destination === 'number' ? parseInt(destination) : destination.getBoundingClientRect().top + start;
}

const smoothScroll = (destination, duration = 800) => {
	const start = window.pageYOffset;
	const end = destinationPosition(destination, start);
	const clock = Date.now();

	const step = () => {
		const elapsed = Date.now() - clock;
		window.scroll(0, position(start, end, elapsed, duration));

		if (elapsed < duration) {
			requestAnimationFrame(step);
		}
	};
	step();
};

export default smoothScroll;
