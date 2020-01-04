import { elements } from '../config';

export default function(actualPosition) {
	elements.heroParallax.style.transform = `translateY(-${Math.round(actualPosition / 3)}px)`;
}
