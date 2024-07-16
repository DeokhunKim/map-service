import io from "socket.io-client";

const socket = io('http://localhost:5050', {
    path: '/socket.io/'
});

socket.on('connect', () => {
    console.log('Connected to Socket.IO server');
    sendTestEvent('test', 'hello world!')
});

socket.on('message', (msg) => {
    console.log('Message from server: ', msg);
});

socket.on('response', (msg) => {
    console.log('Response from server: ', msg);
});

socket.on('disconnect', () => {
    console.log('Disconnected from Socket.IO server');
});

function sendTestEvent(event, message) {
    console.log(`Sending test event: ${message}`);
    socket.emit(event, message);
}

