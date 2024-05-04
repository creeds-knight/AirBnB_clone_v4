// 1-hbnb.js
$(document).ready(function() {
	let amenitiesSelected = []; //store for amenities

	// listen for changes in checkbox tag
	$('input[type=checkbox]').change(function() {
		let amenityID = $(this).data('id');
		let amenityName = $(this).data('name');

		if (this.checked) {
			amenitiesSelected.push(amenityID);
		} else {
			let index = amenitiesSelected.indexOf(amenityID);
			if (index !== -1) {
				amenitiesSelected.splice(index, 1);
			}
		}


		$('.amenities h4').text("Amenities Selected: " + amenitiesSelected.join(', '));
	});
	$('.amenities input[type="checkbox"]'.css({
		'position':'absolute',
		'left':'10px',
		'top':'50%'
		'transform':'translateY(-50%)'
	});
	$('.amenities li').css('position', 'relative');
});
