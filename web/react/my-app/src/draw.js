import React from 'react';
import ReactDOM from 'react-dom';
import PopupContainer from './popup_container';
export { create_popup_select, hide_popup_select, get_select_popup_position };

let popup;
let popup_div = document.getElementById("popup-select");


export const createPopupClass = () => {
  if (!window.google || !window.google.maps) {
    console.error('Google Maps API is not loaded.');
    return null;
  }

  class Popup extends window.google.maps.OverlayView {
      position;
      containerDiv;
      constructor(position, content) {
        super();
        this.position = position;
        content.classList.add("popup-bubble");

        // This zero-height div is positioned at the bottom of the bubble.
        const bubbleAnchor = document.createElement("div");

        bubbleAnchor.classList.add("popup-bubble-anchor");
        bubbleAnchor.appendChild(content);
        // This zero-height div is positioned at the bottom of the tip.
        this.containerDiv = document.createElement("div");
        this.containerDiv.classList.add("popup-container");
        this.containerDiv.style.position = "absolute";
        this.containerDiv.appendChild(bubbleAnchor);
        // Optionally stop clicks, etc., from bubbling up to the map.
        Popup.preventMapHitsAndGesturesFrom(this.containerDiv);
      }
      /** Called when the popup is added to the map. */
      onAdd() {
        this.getPanes().floatPane.appendChild(this.containerDiv);
      }
      /** Called when the popup is removed from the map. */
      onRemove() {
        if (this.containerDiv.parentElement) {
            this.containerDiv.parentElement.removeChild(this.containerDiv);
        }
      }
      /** Called each frame when the popup needs to draw itself. */
      draw() {
        const divPosition = this.getProjection().fromLatLngToDivPixel(
          this.position,
        );
        // Hide the popup when it is far out of view.
        const display =
          Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
            ? "block"
            : "none";

        if (display === "block") {
          this.containerDiv.style.left = divPosition.x + "px";
          this.containerDiv.style.top = divPosition.y + "px";
        }

        if (this.containerDiv.style.display !== display) {
          this.containerDiv.style.display = display;
        }
      }

      get_position(){
          return this.position;
      }
    }
  return Popup;
};



async function create_popup_select(x, y, map) {
	console.log('create_popup_select')
    if(popup != null){
        popup.onRemove();
        console.log('aa:' + popup)
    }
    const CPopup = createPopupClass();
    //popup_div = document.getElementById("popup-select");
    const container = document.createElement('div');


    container.id = 'popup-select';
    ReactDOM.render(<PopupContainer />, container);
    document.body.appendChild(container);


    //popup_div.style.display = 'block';
    popup = new CPopup(
        new window.google.maps.LatLng(x, y), container,
        );
    popup.setMap(map);
}

async function hide_popup_select() {
	console.log('hide_popup_select')
	popup.onRemove();
}

function get_select_popup_position() {
	return popup.get_position();
}

