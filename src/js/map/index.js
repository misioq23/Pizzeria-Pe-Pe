import L from 'leaflet';

const map = () => {
	const pepeLoc = [52.2176335306207, 21.22334557747987];
	const pepe = L.map(document.querySelector('.map'), {
		dragging: !L.Browser.mobile,
	}).setView(pepeLoc, 16);
	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 18,
	}).addTo(pepe);
	L.marker(pepeLoc).addTo(pepe);
};

export default map;
