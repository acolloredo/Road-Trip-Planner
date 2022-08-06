let map, infoWindow;
let orig, dest;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 10,
  });
  infoWindow = new google.maps.InfoWindow();
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


window.initMap = initMap;
window.onload = setToCurrentLatLng;
document.getElementById("submit-btn").addEventListener("click", getOrigDestVal)
