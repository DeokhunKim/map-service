import io from "socket.io-client";

import { getMySid, setMySid, getMyColor, setMyColor, getHashColor } from "./shared.js";
import { create_ping } from "./ping.js";

const room_name = 'room1';

const socket = io('http://localhost:5050', {
    path: '/socket.io/'
});

socket.on('connect', () => {
    console.log('Connected to Socket.IO server');
    socket.emit('join_room', { room: room_name });
});

socket.on('disconnect', () => {
    console.log('Disconnected from Socket.IO server');
    socket.emit('leave_room', { room: room_name });
});

socket.on('join_success', (msg) => {
    console.log('join_success: ', msg);
    setMySid(msg)
});

// 이벤트
socket.on('message', (msg) => {
    console.log('Message from server: ', msg);
    
});

socket.on('response', (msg) => {
    console.log('Response from server: ', msg);
});

socket.on('ping', (msg) => {
    console.log('Emit ping: ', msg);
    let sid = msg.sid;
    if( isMyEmit(sid) ){
        return
    }
    let parsedMessage = JSON.parse(msg.message.replace(/([a-zA-Z0-9]+?):/g, '"$1":')); // 문자열을 JSON 형식으로 변환
    let lat = parsedMessage.lat;
    let lng = parsedMessage.lng;
    
    create_ping(lat, lng, getHashColor(sid))

});


function sendTestEvent(event, room, message) {
    console.log(`Sending test event: ${message}`);
    socket.emit(event, { room: room, message: 'Hello, Room!' });
}

function sendEvent(event, room, message) {
    console.log(`Sending event: ${event}, room: ${room}, message: ${message}`);
    socket.emit(event, { room: room, message: message });
}

function isMyEmit(sid) {
    return getMySid() == sid;
}

export { sendEvent };