// We do not want this script to be applied in browsers that do not support those
// That means no smoothscroll on IE9 and below.
// if (document.querySelectorAll === void 0 || window.pageYOffset === void 0 || history.pushState === void 0) { return; }

// Get the top position of an element in the document
function getTop(element, start) {
	// return value of html.getBoundingClientRect().top ... IE : 0, other browsers : -pageYOffset
	if (element.nodeName === 'HTML') {
		return -start;
	}
	return element.getBoundingClientRect().top + start;
}

// ease in out function thanks to:
// http://blog.greweb.fr/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/
function easeInOutCubic(t) {
	return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// calculate the scroll position we should be in
// given the start and end point of the scroll
// the time elapsed from the beginning of the scroll
// and the total duration of the scroll (default 500ms)
function position(start, end, elapsed, duration) {
	if (elapsed > duration) {
		return end;
	}
	return start + (end - start) * easeInOutCubic(elapsed / duration);
	// return start + (end - start) * (elapsed / duration); // <-- this would give a linear scroll
}

// we use requestAnimationFrame to be called by the browser before every repaint
// if the first argument is an element then scroll to the top of this element
// if the first argument is numeric then scroll to this location
// if the callback exist, it is called when the scrolling is finished
// if context is set then scroll that element, else scroll window
const smoothScroll = (el, callback, duration = 500, context = window) => {
	const start = context.scrollTop || window.pageYOffset;
	let end;
	if (typeof el === 'number') {
		end = parseInt(el);
	} else {
		end = getTop(el, start);
	}

	const animationFrame = (fn) => {
		window.setTimeout(fn, 15);
	};

	const clock = Date.now();
	const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || animationFrame(fn);

	const step = () => {
		const elapsed = Date.now() - clock;
		if (context !== window) {
			context.scrollTop = position(start, end, elapsed, duration);
		} else {
			window.scroll(0, position(start, end, elapsed, duration));
		}

		if (elapsed > duration) {
			if (typeof callback === 'function') {
				callback(el);
			}
		} else {
			requestAnimationFrame(step);
		}
	};
	step();
};

export default smoothScroll;
