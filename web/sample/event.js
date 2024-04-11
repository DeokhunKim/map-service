console.log('index2')
import { map } from './index.js';
import { create_place } from './marker.js';





map.addListener("click", (e) => {
	let position = e.latLng.toJSON();
	console.log(position);
	create_place(position.lat, position.lng, "basic")
  });
  
  
