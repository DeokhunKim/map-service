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

    // 마커 생성
    const location = { lat: 37.51, lng: 127.01 };
    const marker = new google.maps.Marker({
      position: location,
      map: instance,
      animation: google.maps.Animation.DROP,
    });

    // ping 효과 추가
    const circle = new google.maps.Circle({
      map: instance,
      center: location,
      radius: 50,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      //fillColor: '#FF0000',
      fillOpacity: 0.35,
    });

    // 애니메이션 효과 적용
    let growing = true;
    const interval = setInterval(() => {
      const radius = circle.getRadius();
      if (growing) {
        circle.setRadius(radius + 10);
        if (radius >= 300) growing = false;
      } else {
        circle.setRadius(radius - 10);
        if (radius <= 50) growing = true;
      }
    }, 100);


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