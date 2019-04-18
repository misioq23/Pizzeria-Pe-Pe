import { elements, elementStrings } from '../config';
export function navbarColor(navbarState) {
	navbarState ? elements.navbar.classList.add(elementStrings.navbarActive) : elements.navbar.classList.remove(elementStrings.navbarActive);
}
