

const main = () =>{

  mapboxgl.accessToken = 'pk.eyJ1IjoiY2hsb2VsZXRlaW50dXJpZXIiLCJhIjoiY2szN2huM3poMGJudjNobnM5OHZsMjlvYyJ9.Mgce1SSAIhGeAWsVKnL1fw';
  var map = new mapboxgl.Map({
    container: 'map', // HTML container id
    style: 'mapbox://styles/mapbox/streets-v9', // style URL
    center: [2.190621, 41.398544], // starting position as [lng, lat]
    zoom: 13
  });

  if (navigator.geolocation) {
    
  navigator.geolocation.getCurrentPosition((position) => {
    console.log('position', position);
    
    var pos = [position.coords.longitude, position.coords.latitude];
    console.log('pos:', pos);
    
    map.setCenter(pos);
    
  }, () => {
    alert('Issue retrieving your location');
  });
  } else {
    alert(' Your browser doesn\'t support Geolocation');
  }

  axios.get('http://localhost:3000/api/restaurants')
  .then((result) => {
    result.data.forEach(restaurant => {
      new mapboxgl.Marker()
        .setLngLat(restaurant.location.coordinates.reverse())
        .addTo(map);
    });
  })
  .catch(err => console.error(err));

}

window.addEventListener('load', main);