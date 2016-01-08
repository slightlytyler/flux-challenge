import {
  applyMiddleware,
  compose,
  createStore
} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import obiWanMonitor from './obiWanMonitor';

export default function configureStore (initialState) {
  let createStoreWithMiddleware;
  const middleware = applyMiddleware(thunk, obiWanMonitor);

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
    rootReducer, initialState
  );
  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default;

      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
