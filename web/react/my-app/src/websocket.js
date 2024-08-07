import io from "socket.io-client";

const room_name = 'room1';

const socket = io('http://localhost:5050', {
    path: '/socket.io/'
});

socket.on('connect', () => {
    console.log('Connected to Socket.IO server');
    socket.emit('join_room', { room: room_name });
    sendTestEvent('test', room_name, 'hello world!')
});

socket.on('message', (msg) => {
    console.log('Message from server: ', msg);
});

socket.on('response', (msg) => {
    console.log('Response from server: ', msg);
});

socket.on('disconnect', () => {
    console.log('Disconnected from Socket.IO server');
    socket.emit('leave_room', { room: room_name });
});

function sendTestEvent(event, room, message) {
    console.log(`Sending test event: ${message}`);
    socket.emit(event, message);
    socket.emit(event, { room: room, message: 'Hello, Room!' });
}




// export { init_event };