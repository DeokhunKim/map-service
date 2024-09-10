
import React from 'react';
import ReactDOM from 'react-dom';
import { createPingOverlayClass } from './PingOverlay.js'

let map = null;
let pingOverlay = null;

function init_ping(instance){
  map = instance;
}

export const create_ping = (lat, lng, color="blue") => {
    // 마커 생성
    const location = { lat: lat, lng: lng };
    const url = './antenna_' + color + '.svg'
    const arrowIcon = {
        url: url, // 업로드된 이미지 파일 경로
        scaledSize: new google.maps.Size(30, 30), // 아이콘 크기 조정
        origin: new google.maps.Point(0, 0), // 이미지 원점
        anchor: new google.maps.Point(15, 25),   // 앵커 포인트
        fillColor: "red",
    };
    const marker = new window.google.maps.Marker({
      position: location,
      map: map,
      icon: arrowIcon,
      animation: window.google.maps.Animation.DROP,
    });


    
    console.log('create_PingOverlay')
    const CPingOverlay = createPingOverlayClass();
    if (pingOverlay) {
        pingOverlay.setMap(null); // 이전 오버레이 제거
      }

    pingOverlay = new CPingOverlay(location, map, {'background-color': color});
    pingOverlay.setMap(map);  
    
    // map.addListener("bounds_changed", () => {
    //     const bounds = map.getBounds();
    //     if (!bounds.contains(location)) {
    //         console.log('bound out!')
    //         if (pingOverlay) {
    //             pingOverlay.setMap(null); // 이전 오버레이 제거
    //           }
    //         pingOverlay = new CPingOverlay(location, map);
    //         pingOverlay.setMap(map);    

    //     }
    //     else {
    //         if (pingOverlay) {
    //           pingOverlay.setMap(null); // 오버레이 제거
    //           pingOverlay = null;
    //         }
    //     }
    //     });

}


  

  export { init_ping };