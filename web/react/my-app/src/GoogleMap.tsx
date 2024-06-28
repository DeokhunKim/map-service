import {useEffect, useState} from "react";
import {createRoot} from "react-dom/client";
import {init_event} from "./event.js";
import {init_marker} from "./marker.js";
import { createPopupClass } from "./draw.js";

function GoogleMap(){

  const [googleMap, setGoogleMap] = useState<google.maps.Map>();
  console.log(google.maps);
  console.log(google.maps.OverlayView);

  useEffect(() => {

    const mapContainer = document.createElement('div');

    mapContainer.id = 'map';
    mapContainer.style.minHeight = '100vh';

    document.body.appendChild(mapContainer);

    const instance = new window.google.maps.Map(mapContainer, {
      center: {
        lat: 37.5,
        lng: 127.0,
      },
      zoom: 16,
      mapId: '92cb7201b7d43b21',
      disableDefaultUI: true,
      clickableIcons: false,
      minZoom: 10,
      maxZoom: 18,
      gestureHandling: 'greedy',
      restriction: {
        latLngBounds: {
          north: 39,
          south: 32,
          east: 132,
          west: 124,
        },
        strictBounds: true,
      },
    } );

    const handleMapLoad = () => {
      const Popup = createPopupClass();
      if (Popup) {
        console.log('popup?')
      }
    };

    init_event(instance);
    init_marker(instance)

    setGoogleMap(instance);


    return () => {
      document.body.removeChild(mapContainer);
    }

  } ,[])

  useEffect(() => {

    const markerContainer = document.createElement('div');
    const markerInstance = new google.maps.marker.AdvancedMarkerElement({
      position: {
        lat: 37.5,
        lng: 127.0,
      },
      map: googleMap,
      title: '마커',
      content: markerContainer,
    });
    createRoot(markerContainer).render(<div style={{backgroundColor:'yellow', padding:'10px'}}>마커@@!!</div>);
    markerInstance.addListener('click', () => {
      alert('마커 클릭')

    });

    return () => {
      markerInstance.map = null;
    }
  }, [googleMap])


  return <></>
}

export default GoogleMap;