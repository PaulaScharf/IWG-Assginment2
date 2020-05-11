function loadPlaces() {
	return new Promise(function(resolve, reject) {
		var xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				if (this.responseText.length === 0) {
					reject("The URL field or the content of the field is emtpy.");
				}
				let osmtrees = JSON.parse(this.responseText);
				resolve(osmtrees.features);
			}
		};
		xhttp.open("GET", "osmtrees_small.geojson", true);
		xhttp.send();
	});
}

window.onload = () => {
	loadPlaces()
		.then(function(places) {
	scene = document.querySelector('a-scene');
	places.forEach((place) => {
		const latitude = place.geometry.coordinates[1];
		const longitude = place.geometry.coordinates[0];
		const icon = document.createElement('a-image');
		icon.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
		icon.setAttribute('name', place.properties.name);
		icon.setAttribute('src', 'img/map-marker.png');
		icon.setAttribute('look-at', '[gps-camera]');
		icon.setAttribute('show-distance-on-gaze', '');
		icon.setAttribute('scale', '20, 20'); // if you want for debugging
		scene.appendChild(icon);
	});
});
};