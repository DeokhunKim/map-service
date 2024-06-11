import GoogleMap from './GoogleMap.tsx'
import { create_place_by_coord, create_place_by_latlng } from './marker.js';
import { create_popup_select, hide_popup_select, get_select_popup_position } from "./draw.js";

console.log('event.js');

let status = 'stand_by'

function init_event(map){
	console.log('init_event');

	// 클릭 이벤트
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

}

window.onload = function () {
{/* <div id="popup-select" class="popup-select">
        <span class="material-symbols-outlined">location_on</span>
        <span id="popup-select-add_place">Add Place</span>
        <p></p>
        <span class="material-symbols-outlined">transcribe</span>
        <span id="popup-select-ping">Send Location</span>
    </div> */}

	const popup_container = document.createElement('div');

	popup_container.id = 'popup-select';
	popup_container.class = 'popup-select';
	popup_container.onclick = select_add_place;

	document.body.appendChild(popup_container)
}

function select_add_place()  {
	let position= get_select_popup_position();
	console.log(position)
	create_place_by_latlng(position, "basic");
	hide_popup_select();
	status = 'stand_by'
}

export { init_event };