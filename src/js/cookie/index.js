import Cookies from 'js-cookie';
import { elements, elementStrings } from '../config';

export default (function() {

	function _cookieShow() {
		const markup = `<div class="cookie__wrapper">
			<p class="cookie__text">Używamy informacji zapisanych za pomocą plików cookies w celu zapewnienia maksymalnej wygody w korzystaniu z naszego serwisu. Mogą też korzystać z nich współpracujące z nami firmy badawcze oraz reklamowe. Jeżeli wyrażasz zgodę na zapisywanie informacji zawartej w cookies kliknij przycisk &bdquo;AKCEPTUJĘ&rdquo;. Jeśli nie wyrażasz zgody, ustawienia dotyczące plików cookies możesz zmienić w swojej przeglądarce.</p>
			<button class="btn ${elementStrings.cookieBtn}">AKCEPTUJĘ</button>
		</div>`;
		elements.cookie.insertAdjacentHTML('beforeend', markup);
	};

	function _clickHandler(e) {
		if (e.target.classList.contains(elementStrings.cookieBtn)) {
			Cookies.set('cookieinfo', 'true', 365);
			elements.cookie.removeEventListener('click', _clickHandler);
			elements.cookie.parentNode.removeChild(elements.cookie);
		}
	}

	function createCookie() {
		if (Cookies.get('cookieinfo'))
			return false;

		_cookieShow();
		elements.cookie.addEventListener('click', _clickHandler);
	}
	return { createCookie };
}());
