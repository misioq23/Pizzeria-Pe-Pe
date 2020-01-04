function opacityDecrease(actualPosition, elementDistanceFromTop, startFadingPosition = 0) {
	const opacity = (1 - ((actualPosition - startFadingPosition) / (elementDistanceFromTop - startFadingPosition))).toFixed(2);
	// prevent e.g. opacity = 1.05;
	return Math.min(1, opacity);
}

export default function(actualPosition, elementDistanceFromTop, startFadingPosition = 0) {
	return actualPosition < elementDistanceFromTop ? `${opacityDecrease(actualPosition, elementDistanceFromTop, startFadingPosition)}` : '0';
}
