#!/usr/bin/node
$(document).ready(function () {
  let amenity_list = [];
  const amenity_object = { id: $(this).data('id'), name: $(this).data('name') }
  $('input:checkbox').on('change', function () {
    if (this.checked) {
    amenity_list.push(amenity_object);
  } else {
    amenity_list = amenity_list.filter(item => item.id !== amenity_object.id);
  }
  updateAmenityList(amenity_list);
  console.log(amenity_list)
  })});

function updateAmenityList(amenity_list) {
  checkedAmenities = amenity_list.map(item => item.name).join(", ")
  $('.amenities h4').text(checkedAmenities)
}

$(document).ready;
