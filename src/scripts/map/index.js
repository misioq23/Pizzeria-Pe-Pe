export default (function() {
	const pepeLoc = [52.2165, 21.2342];
	const pepe = L.map(document.querySelector('.map'), { dragging: !L.Browser.mobile }).setView(pepeLoc, 16);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		maxZoom: 18,
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1IjoibWkyM2NoYWwiLCJhIjoiY2p1eWY2ZGdpMGhkOTQzcGlqYzB3Mm9zdyJ9.0TBjab2egaDEHuROAQE_0Q'
	}).addTo(pepe);
	L.marker(pepeLoc).addTo(pepe);
}());

