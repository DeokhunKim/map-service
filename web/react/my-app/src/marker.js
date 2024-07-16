
import GoogleMap from './GoogleMap.tsx'
import {useEffect, useState} from "react";
import {createRoot} from "react-dom/client";

console.log('marker')
export { init_marker, create_place_by_coord, create_place_by_latlng };

let map = null;

function init_marker(instance){
  map = instance;
}

const iconBase =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
const icons = {
    parking: {
      icon: iconBase + "parking_lot_maps.png",
    },
    library: {
      icon: iconBase + "library_maps.png",
    },
    info: {
      icon: iconBase + "info-i_maps.png",
    },
	basic: {
		icon: null
	},
  };


function create_place_by_coord(x, y, type) {
	console.log('create_place_by_coord')
	let position = new window.google.maps.LatLng(x,y)
    console.log(position)
	return new window.google.maps.Marker({
      position: position,
      icon: icons[type].icon,
      map: map,
      animation: window.google.maps.Animation.DROP
    });
}


function create_place_by_latlng(latlng, type) {
	console.log('create_place_by_latlng')
	return new window.google.maps.Marker({
      position: latlng,
      icon: icons[type].icon,
      map: map,
      animation: window.google.maps.Animation.DROP
    });
}



// // sample init
// console.log('debug');
// console.log(map);
// const features = [
//     {
//       position: new google.maps.LatLng(36.91721, 127.2263),
//       type: "info",
//     },
//     {
//       position: new google.maps.LatLng(36.91539, 127.2282),
//       type: "info",
//     },
//     {
//       position: new google.maps.LatLng(36.91747, 127.22912),
//       type: "info",
//     },
//     {
//       position: new google.maps.LatLng(36.9191, 127.22907),
//       type: "info",
//     },
//     {
//       position: new google.maps.LatLng(36.91725, 127.23011),
//       type: "info",
//     },
//     {
//       position: new google.maps.LatLng(36.91872, 127.23089),
//       type: "info",
//     },
//     {
//       position: new google.maps.LatLng(36.91784, 127.23094),
//       type: "info",
//     },
//     {
//       position: new google.maps.LatLng(36.91682, 127.23149),
//       type: "info",
//     },
//     {
//       position: new google.maps.LatLng(36.9179, 127.23463),
//       type: "info",
//     },
//     {
//       position: new google.maps.LatLng(36.91666, 127.23468),
//       type: "info",
//     },
//     {
//       position: new google.maps.LatLng(36.916988, 127.23364),
//       type: "info",
//     },
//     {
//       position: new google.maps.LatLng(36.91662347903106, 127.22879464019775),
//       type: "parking",
//     },
//     {
//       position: new google.maps.LatLng(36.916365282092855, 127.22937399734496),
//       type: "parking",
//     },
//     {
//       position: new google.maps.LatLng(36.91665018901448, 127.2282474695587),
//       type: "parking",
//     },
//     {
//       position: new google.maps.LatLng(36.919543720969806, 127.23112279762267),
//       type: "parking",
//     },
//     {
//       position: new google.maps.LatLng(36.91608037421864, 127.23288232673644),
//       type: "parking",
//     },
//     {
//       position: new google.maps.LatLng(36.91851096391805, 127.2344058214569),
//       type: "parking",
//     },
//     {
//       position: new google.maps.LatLng(36.91818154739766, 127.2346203981781),
//       type: "parking",
//     },
//     {
//       position: new google.maps.LatLng(36.91727341958453, 127.23348314155578),
//       type: "library",
//     },
//   ];

//   // Create markers.
//   for (let i = 0; i < features.length; i++) {
//     const marker = new google.maps.Marker({
//       position: features[i].position,
//       icon: icons[features[i].type].icon,
//       map: map,
//     });
//   }