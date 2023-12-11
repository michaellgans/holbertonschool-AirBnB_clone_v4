#!/usr/bin/node

$(document).ready(function () {
  let amenity_list = [];
  
  $('input:checkbox').on('change', function () {
    const amenity_object = { id: $(this).data('id'), name: $(this).data('name') };
  
    if (this.checked) {
      amenity_list.push(amenity_object);
    } else {
      amenity_list = amenity_list.filter(item => item.id !== amenity_object.id);
    }
  
    updateAmenityList(amenity_list);
    console.log(amenity_list);
  });

  function updateAmenityList(amenity_list) {
    checkedAmenities = amenity_list.map(item => item.name).join(", ");
    $('.amenities h4').text(checkedAmenities);
  }

  $.get(`http://${window.location.hostname}:5001/api/v1/status/`, (body) => {
  if (body.status === 'OK') {
      $('#api_status').addClass('available');
      console.log('Sucessfully fetched API status')
  } else {
    $("#api_status").removeClass('available');
      console.log('Could not fetch API status');
    }
  });

  $.ajax({
      type: 'POST',
      url: `http://${window.location.hostname}:5001/api/v1/places_search/`,
      contentType: `application/json`,
      data: '{}', 
      success: function (data) {
        console.log(data)
        for (const places of data) {
          $(".places").append(
            `<article>
              <h2>${places.name}</h2>
              <div class="price_by_night">
                  <p>$${places.price_by_night}</p>
              </div>
              <div class="information">
                  <div class="max_guest">
                      <div class="guest_image"></div>
                      <p>${places.max_guest}</p>
                  </div>
                  <div class="number_rooms">
                      <div class="bed_image"></div>
                      <p>${places.number_rooms}</p>
                  </div>
                  <div class="number_bathrooms">
                      <div class="bath_image"></div>
                      <p>${places.number_bathrooms}</p>
                  </div>
              </div>
              <div class="description">
                  <p>${places.description}</p>
              </div>
            </article>`
          )
        }
      }
    })
});

