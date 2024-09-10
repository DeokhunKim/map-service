import socketio
import uvicorn
from logger import Logger
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

logger = Logger.getLogger(__name__)


sio = socketio.AsyncServer(cors_allowed_origins='*', async_mode='asgi', logger=True)
app = FastAPI()
app.add_middleware(
      CORSMiddleware,
    #   allow_origins=["*"], # Allows all origins
      allow_credentials=True,
      allow_methods=["*"], # Allows all methods
      allow_headers=["*"], # Allows all headers
)


app.mount("/socket.io", socketio.ASGIApp(sio, other_asgi_app=app))



# Handle connection events
@sio.event
async def connect(sid, environ):
    logger.debug(f'Client connected: {sid}')
    await sio.emit('message', 'Welcome!', to=sid)

@sio.event
async def disconnect(sid):
    print(f'Client disconnected: {sid}')
    
    
# Handle join room
@sio.on('join_room')
async def join_room(sid, data):
    room = data['room']
    await sio.enter_room(sid, room)
    await sio.emit('join_success', f'{sid}', to=sid)
    await sio.emit('message', f'{sid} has entered the room {room}', room=room)
    logger.info(f'{sid} joined room {room}')

# Handle leave room
@sio.on('leave_room')
async def leave_room(sid, data):
    room = data['room']
    sio.leave_room(sid, room)
    await sio.emit('message', f'{sid} has left the room {room}', room=room)
    print(f'{sid} left room {room}')


# Handle sending a message to a room
@sio.on('send_room_message')
async def send_room_message(sid, data):
    room = data['room']
    message = data['message']
    await sio.emit('message', message, room=room)
    print(f'Message to room {room} from {sid}: {message}')
    

# Handle custom events
# 디버깅
@sio.on('test') 
async def sendMessage(sid, data):
    print(f'Message from {sid}: {data}')

# 디버깅
@sio.on('postman')
async def sendPostmanMessage(sid, data):
    print(f'sendPostmanMessage from {sid}: {data}')
    await sio.emit('message', 'gogo', room='room1')

# 핑 Ping
@sio.on('ping')
async def received_ping(sid, data):
    logger.info(f'Ping message sid: {sid} data: {data}')
    msg = {
        'sid': sid,
        'message': data['message'],
    }
    await sio.emit('ping', msg, room=data['room'])

    

if __name__ == '__main__':
    print('start main')
    map_service_socket_app = socketio.ASGIApp(sio, app)
    uvicorn.run(map_service_socket_app, host='0.0.0.0', port=8080)