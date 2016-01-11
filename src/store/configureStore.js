import {
  applyMiddleware,
  compose,
  createStore
} from 'redux';
import thunk from 'redux-thunk';
import { createRequestMiddleware } from 'redux-requests';
import reducers from 'reducers';
import obiWanMonitor from 'pods/location/middleware/web-socket';

export default function configureStore (initialState) {
  let createStoreWithMiddleware;
  const middleware = applyMiddleware(
    thunk,
    createRequestMiddleware(),
    obiWanMonitor
  );

  if (__DEBUG__) {
    createStoreWithMiddleware = compose(
      middleware,
      window.devToolsExtension
        ? window.devToolsExtension()
        : require('containers/DevTools').default.instrument()
    );
  } else {
    createStoreWithMiddleware = compose(middleware);
  }

  const store = createStoreWithMiddleware(createStore)(
    reducers, initialState
  );
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;

      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
