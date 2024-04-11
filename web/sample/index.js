const { Map } = await google.maps.importLibrary("maps");
let map = new Map(document.getElementById("map"), {
    center: new google.maps.LatLng(36.589979, 127.9716999),
    zoom: 8,
  });

async function initMap() {
  

}

initMap();
export { map };
console.log('initMap');


