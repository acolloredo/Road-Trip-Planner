let map, infoWindow, directionsService, directionsRenderer;
let orig, dest;
let autocompleteOrig, autocompleteDest;

function initMap() {
  let mapOptions = {
    center : {lat:0.0, lng: 0.0},
    zoom : 10,
    mapTypeId: google.maps.MapTypeId.HYBRID
  }

  var searchOptions = {
    types : ["(cities)"]
  }
  
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  infoWindow = new google.maps.InfoWindow();
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  autocompleteOrig = new google.maps.places.Autocomplete(document.getElementById("origin"), searchOptions);
  autocompleteDest = new google.maps.places.Autocomplete(document.getElementById("destination"), searchOptions);

  directionsRenderer.setMap(map)
}

function handleLocationSuccess(position) {
  const pos = {
    lat : position.coords.latitude,
    lng : position.coords.longitude
  };
  map.setCenter(pos);
}

function handleLocationFailure(infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent("Error: Geolocation Failed");
  infoWindow.open(map)
}

function setToCurrentLatLng() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      handleLocationSuccess,
      () => {
        handleLocationFailure(infoWindow, map.getCenter());
      }
    )
  } else {
    handleLocationFailure(infoWindow, map.getCenter());
  }
}

function getOrigDestVal() {
  orig = document.getElementById("origin").value;
  dest = document.getElementById("destination").value;
  console.log(orig, dest);
}
 
function getRoute() {
  console.log("blah");
  getOrigDestVal();
  let routeInput = {
    origin : orig,
    destination : dest,
    travelMode : google.maps.TravelMode.DRIVING,
    unitSystem : google.maps.UnitSystem.IMPERIAL
  }

  directionsService.route(routeInput, (result, status) => {
    if (status === google.maps.DirectionsStatus.OK) {
      console.log("succeded");
      //let output = document.querySelector('#output');
      //output.innerHTML = "<div class='alert-info'>From: " + orig + ".<br />To: " + dest + ".<br /> Driving distance: " + result.routes[0].legs[0].distance.text + ".<br />Duration: " + result.routes[0].legs[0].duration.text + ".</div>";
      directionsRenderer.setDirections(result);
    } else {
      console.log("fail");
      directionsRenderer.setDirections({routes: []});
      //setToCurrentLatLng();
    }
  })
}


window.initMap = initMap;
window.onload = setToCurrentLatLng;
document.getElementById("submit-btn").addEventListener("click", getRoute)
