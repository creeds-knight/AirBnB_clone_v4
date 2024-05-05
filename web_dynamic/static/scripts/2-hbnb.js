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


	function checkApiStatus() {
        $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
            if (data.status === 'OK') {
                $('#api_status').addClass('available'); // Add class if status is OK
                $('#api_status').css({
                    'background-color': '#ff545f', /* Red background color */
                    'position': 'absolute',
                    'top': '50%',
                    'right': '30px',
                    'transform': 'translateY(-50%)',
                    'width': '40px',
                    'height': '40px',
                    'border-radius': '50%' /* Circle */
                });
            } else {
                $('#api_status').removeClass('available'); // Remove class if status is not OK
                $('#api_status').css('background-color', '#cccccc'); /* Gray background color */
            }
        });
	})
		checkApiStatus();
		setInterval(checkApiStatus, 5000);
});
