import { set, get } from '@firstandthird/cookie-monster';
import { elements, elementStrings } from '../config';

export const cookies = (function() {

	function cookieShow() {
		const markup = `<div class="cookie__wrapper">
			<p class="cookie__text">Używamy informacji zapisanych za pomocą plików cookies w celu zapewnienia maksymalnej wygody w korzystaniu z naszego serwisu. Mogą też korzystać z nich współpracujące z nami firmy badawcze oraz reklamowe. Jeżeli wyrażasz zgodę na zapisywanie informacji zawartej w cookies kliknij przycisk &bdquo;AKCEPTUJĘ&rdquo;. Jeśli nie wyrażasz zgody, ustawienia dotyczące plików cookies możesz zmienić w swojej przeglądarce.</p>
			<button class="${elementStrings.cookieBtn}">AKCEPTUJĘ</button>
		</div>`;
		elements.cookie.insertAdjacentHTML('beforeend', markup);
	};

	function clickHandler(e) {
		if (e.target.classList.contains(elementStrings.cookieBtn)) {
			set('cookieinfo', 'true', 365);
			elements.cookie.removeEventListener('click', clickHandler);
			elements.cookie.parentNode.removeChild(elements.cookie);
		}
	}

	function createCookie() {
		if (get('cookieinfo') === 'true') {
			return false;
		}
		cookieShow();
		elements.cookie.addEventListener('click', clickHandler);
	}
	return { createCookie };
}());
