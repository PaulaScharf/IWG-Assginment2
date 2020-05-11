AFRAME.registerComponent('show-distance-on-gaze', {
	init: function () {
		let el = this.el;
		let popup = document.getElementById("myPopup");

		el.addEventListener('mouseenter', function () {
			currentElement = el;
			if(!popup.classList.contains("show")) {
				console.dir("show");
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
