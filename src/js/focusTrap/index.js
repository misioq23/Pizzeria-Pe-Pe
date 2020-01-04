export default (function() {

	function findElements(element) {
		const focusable = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
		return Array.prototype.slice.call(focusable);
	}

	function trapToggle(array, trap) {
		if (trap)
			array.forEach(element => {
				element.setAttribute('tabindex', -1);
			});
		 else
			array.forEach(element => {
				element.removeAttribute('tabindex', -1);
			});

	}
	return { findElements, trapToggle };
}());
