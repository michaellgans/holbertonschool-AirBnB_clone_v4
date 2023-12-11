#!/usr/bin/node

$(document).ready(function () {
  let amenityList = [];

  $('input:checkbox').on('change', function () {
    const amenityObject = { id: $(this).data('id'), name: $(this).data('name') };

    if (this.checked) {
      amenityList.push(amenityObject);
    } else {
      amenityList = amenityList.filter(item => item.id !== amenityObject.id);
    }

    updateAmenityList(amenityList);
    console.log(amenityList);
  });
});

function updateAmenityList (amenityList) {
  const checkedAmenities = amenityList.map(item => item.name).join(', ');
  $('.amenities h4').text(checkedAmenities);
}

$(document).ready();
