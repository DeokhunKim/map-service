import React from 'react';

const PopupContainer = () => {
  return (
    <div id="popup-select" className="popup-select">
      <span className="material-symbols-outlined">location_on</span>
      <span id="popup-select-add_place">Add Place</span>
      <p></p>
      <span className="material-symbols-outlined">transcribe</span>
      <span id="popup-select-ping">Send Location</span>
    </div>
  );
};

export default PopupContainer;