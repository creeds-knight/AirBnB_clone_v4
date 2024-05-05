$(document).ready(function() {
    let amenitiesSelected = []; // Store for amenities

    // Listen for changes in checkbox tag
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

    // Apply CSS to checkboxes
    $('.amenities input[type="checkbox"]').css({
        'position': 'absolute',
        'left': '10px',
        'top': '50%',
        'transform': 'translateY(-50%)'
    });
    $('.amenities li').css('position', 'relative');

    // Function to check API status
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
    }

    // Call checkApiStatus function
    checkApiStatus();
    setInterval(checkApiStatus, 5000);

    // Function to fetch places data and populate the HTML
    function fetchPlaces(amenities) {
        $.ajax({
            type: "POST",
            url: "http://0.0.0.0:5001/api/v1/places_search",
            contentType: "application/json",
            data: JSON.stringify({'amenities': amenities}),
            success: function(data) {
                $('.places').empty(); // Clear existing content
                data.forEach(function(place) {
                    let placeHTML ='<article>' +
                        '<div class="title_box">' +
                        '<h2>' + place.name + '</h2>' +
                        '<div class="price_by_night">$' + place.price_by_night + '</div>' +
                        '</div>' +
                        '<div class="information">' +
                        '<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>' +
                        '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>' +
                        '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>' +
                        '</div>' +
                        '<div class="description">' + place.description + '</div>' +
                        '</article>';
                    $('.places').append(placeHTML);
                });
            },
            error: function(xhr, status, error) {
                console.error("Error fetching places:", error);
            }
        });
    }

    // Call fetchPlaces function initially
    fetchPlaces([]);

    // Listen for button click to fetch places based on selected amenities
    $('button').click(function() {
        let checkedAmenities = getCheckedAmenities();
        fetchPlaces(checkedAmenities);
    });

    // Define getCheckedAmenities function
    function getCheckedAmenities() {
        let checkedAmenities = [];
        // Loop through each checked checkbox and push its data-id into checkedAmenities array
        $('.amenities input[type="checkbox"]:checked').each(function() {
            checkedAmenities.push($(this).data('id'));
        });
        return checkedAmenities;
    }
});

