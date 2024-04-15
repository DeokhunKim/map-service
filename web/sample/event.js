import { map } from './index.js';
import { create_place } from './marker.js';
import { create_popup_select, hide_popup_select } from "./draw.js";


let status = 'stand_by'



map.addListener("click", (e) => {
	if(status === 'stand_by') {
		console.log('status is stand_by');
		let position = e.latLng.toJSON();
		create_place(position.lat, position.lng, "basic")
	}
	else if(status === 'popup_select') {
		console.log('status is popup_select');
		hide_popup_select();
	}

  });


map.addListener("rightclick", (e) => {
	let position = e.latLng.toJSON();
	create_popup_select(position.lat, position.lng, map)
	status = 'popup_select'
  });
