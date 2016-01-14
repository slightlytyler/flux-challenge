import { setLocation } from 'pods/location/actions';

// Middleware that monitors websockets and emits and update actions
const locationWebSocket = store => next => action => {
  const socket = new WebSocket('ws://localhost:4000');

  socket.addEventListener('message', e => {
    console.log(JSON.parse(e.data));

    store.dispatch(
      setLocation(JSON.parse(e.data))
    )
  });

  return next(action);
};

export default locationWebSocket;
