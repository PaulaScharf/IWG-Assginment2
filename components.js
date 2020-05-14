AFRAME.registerComponent('show-distance-on-gaze', {
	init: function () {
		let el = this.el;
		let popup = document.getElementById("myPopup");
		let componentPosition = el.getAttribute("gps-entity-place");
		let lastDistance;

		/**
		 * If the gaze enters the component call for the current position of the device and then calculate the distance to the
		 * component. Meanwhile already toggle the popup to be visible.
		 */
		el.addEventListener('mouseenter', function () {
			if(!popup.classList.contains("show")) {
				if(typeof lastDistance !== "undefined") {
					popup.innerText = "distance: " + lastDistance + "m";
				} else {
					popup.innerText = "distance: loading...";
				}
				getPosition().then(function(myPosition) {
					let distance = distanceInKmBetweenEarthCoordinates(componentPosition.latitude, componentPosition.longitude,
						myPosition.coords.latitude, myPosition.coords.longitude);
					lastDistance = Math.round(distance * 100) / 100;
					popup.innerText = "distance: " + lastDistance + "m"
				});
				popup.classList.toggle("show");
			}
		});

		/**
		 * If the gaze leaves a component toggle the popup to be invisible again.
		 */
		el.addEventListener('mouseleave', function () {
			if(popup.classList.contains("show")) {
				popup.classList.toggle("show");
			}
		});
	}
});

/**
 * convert from degrees to radians
 * @see https://stackoverflow.com/a/365853
 * @param degrees
 * @returns radians
 */
function degreesToRadians(degrees) {
	return degrees * Math.PI / 180;
}

/**
 * calculate distance (in km) between two gps coordinates, defined by latitude and longitude, using the haversine formula.
 * @see https://stackoverflow.com/a/365853
 * @param lat1
 * @param lon1
 * @param lat2
 * @param lon2
 * @returns distance in km
 */
function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
	var earthRadiusKm = 6371;

	var dLat = degreesToRadians(lat2-lat1);
	var dLon = degreesToRadians(lon2-lon1);

	lat1 = degreesToRadians(lat1);
	lat2 = degreesToRadians(lat2);

	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	return earthRadiusKm * c;
}

/**
 * Get current gps position
 * @returns Promise that will resolve in the current location
 */
function getPosition() {
	return new Promise(function(resolve, reject) {
		try {
			navigator.geolocation.getCurrentPosition(function (position) {
				resolve(position);
			});
		} catch (e) {
			reject(e);
		}
	});
}
