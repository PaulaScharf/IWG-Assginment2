AFRAME.registerComponent('show-distance-on-gaze', {
	init: function () {
		let el = this.el;
		let popup = document.getElementById("myPopup");
		let componentPosition = el.getAttribute("gps-entity-place");

		el.addEventListener('mouseenter', function () {
			if(!popup.classList.contains("show")) {
				console.dir("show");
				getPosition().then(function(myPosition) {
					let distance = distanceInKmBetweenEarthCoordinates(componentPosition.latitude, componentPosition.longitude,
						myPosition.coords.latitude, myPosition.coords.longitude);
					popup.innerText = "distance: " + Math.round(distance * 100) / 100 + "m"
				})
				popup.classList.toggle("show");
			}
		});

		el.addEventListener('mouseleave', function () {
			if(popup.classList.contains("show")) {
				console.dir("hide");
				popup.classList.toggle("show");
			}
		});
	}
});

function degreesToRadians(degrees) {
	return degrees * Math.PI / 180;
}

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
 * @returns {Promise<any>}
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
