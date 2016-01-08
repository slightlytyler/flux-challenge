// Middleware that monitors websockets and emits and update actions
const obiWanMonitor = store => next => action => {
  const socket = new WebSocket('ws://localhost:4000');

  socket.addEventListener('message', e =>
    store.dispatch({
      type: 'OBI_WAN_LOCATION_CHANGE',
      payload: JSON.parse(e.data)
    })
  );

  return next(action);
};

export default obiWanMonitor;
