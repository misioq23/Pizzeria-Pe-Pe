import { getSectionPositions } from './functions/adressChange';
import { elements } from './config';

export function calculatePositions() {
	const positions = {};
	const startPosition = window.pageYOffset;
	// Positions of dataCheckpoints
	positions['mainSections'] = getSectionPositions(startPosition);
	// Actual window position + headline distance to top of window + (visual improvment: half of headline height)
	positions['headlineDistanceTop'] = startPosition + elements.headline.getBoundingClientRect().top + (elements.headline.offsetHeight / 2);
	positions['heroBtnDistanceTop'] = startPosition + elements.heroBtn.getBoundingClientRect().top;
	positions['heroBtnFadeStartPosition'] = positions.heroBtnDistanceTop / 2;
	return positions;
}
