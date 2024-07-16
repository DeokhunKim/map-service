import socketio
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


sio = socketio.AsyncServer(cors_allowed_origins='*', async_mode='asgi')
app = FastAPI()
app.add_middleware(
      CORSMiddleware,
      allow_origins=["*"], # Allows all origins
      allow_credentials=True,
      allow_methods=["*"], # Allows all methods
      allow_headers=["*"], # Allows all headers
)


map_service_socket_app = socketio.ASGIApp(sio, app)

# Handle connection events
@sio.event
async def connect(sid, environ):
    print(f'Client connected: {sid}')
    await sio.emit('message', 'Welcome!', to=sid)

@sio.event
async def disconnect(sid):
    print(f'Client disconnected: {sid}')

# Handle custom events
@sio.on('test')
async def sendMessage(sid, data):
    print(f'Message from {sid}: {data}')
    #await sio.send(f'Echo: {data}', to=sid)

if __name__ == '__main__':
    print('start main')
    uvicorn.run(map_service_socket_app, host='0.0.0.0', port=8080)