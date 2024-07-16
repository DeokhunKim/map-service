

export const createPingOverlayClass = () => {
    if (!window.google || !window.google.maps) {
      console.error('Google Maps API is not loaded.');
      return null;
    }
  
    class PingOverlay extends window.google.maps.OverlayView {
      constructor(position, map) {
        super();
        this.position = position;
        this.div = null;
        this.map = map;
        //this.setMap(map);
      }
    
      onAdd() {
        const div = document.createElement('div');
        div.className = 'ping-border';
        this.div = div;
        const panes = this.getPanes();
        panes.overlayLayer.appendChild(div);
      }
    
      draw() {
        const overlayProjection = this.getProjection();
        const position = overlayProjection.fromLatLngToDivPixel(this.position);
        const div = this.div;
    
        if (div) {
          div.style.left = `${position.x - 10}px`; // 10은 div의 절반 너비
          div.style.top = `${position.y - 10}px`;  // 10은 div의 절반 높이
        }
      }
    
      onRemove() {
        if (this.div) {
          this.div.parentNode.removeChild(this.div);
          this.div = null;
        }
      }

      setStyle(styleObj) {
        const div = this.div;
        if (div) {
          Object.assign(div.style, styleObj);
        }
      }

    }
   
    return PingOverlay;
  };
  