import { map } from './index.js';
import { create_place_by_coord, create_place_by_latlng } from './marker.js';
import { create_popup_select, hide_popup_select, get_select_popup_position } from "./draw.js";


let status = 'stand_by'



map.addListener("click", (e) => {
	if(status === 'stand_by') {
		console.log('status is stand_by');
		let position = e.latLng.toJSON();
		create_place_by_coord(position.lat, position.lng, "basic")
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


window.onload = function () {
    var el = document.getElementById("popup-select-add_place");
    el.onclick = select_add_place;
}

function select_add_place()  {
	let position= get_select_popup_position();
	console.log(position)
	create_place_by_latlng(position, "basic");
	hide_popup_select();
	status = 'stand_by'
}