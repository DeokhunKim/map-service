import React from 'react';
import { create_place_by_coord, create_place_by_latlng } from './marker.js';
import { create_ping } from "./ping.js";
import { sendEvent } from "./websocket.js"

const room = 'room1';

const PopupContainer = ({ lat, lng, hide_func }) => {
   // 이벤트 핸들러 함수 정의
   const handleAddPlaceClick = () => {
    console.log('Add Place clicked');
		create_place_by_coord(lat, lng, "basic")
    hide_func();
  };

  const handleSendLocationClick = () => {
    console.log('Send Location clicked');
    create_ping(lat, lng);
    const message = `{lat:${lat},lng:${lng}}`;
    sendEvent('ping', room, message)
    hide_func();
  };

  return (
    <div id="popup-select" className="popup-select">
      <div onClick={handleAddPlaceClick}>
        <span className="material-symbols-outlined">location_on</span>
        <span id="popup-select-add_place">Add Place</span>
      </div>
      <div onClick={handleSendLocationClick}>
        <span className="material-symbols-outlined">transcribe</span>
        <span id="popup-select-ping">Send Location</span>
      </div>
    </div>
  );
};

export default PopupContainer;