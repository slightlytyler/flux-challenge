import { createHistory, useBasename } from 'history';
import { syncReduxAndRouter } from 'redux-simple-router';
import routes from 'routes';
import Root from 'containers/Root';
import configureStore from 'store/configureStore';
import requestsTracker from 'pods/sith/requests-tracker';

const history = useBasename(createHistory)({
  basename: __BASENAME__
});
const store = configureStore();

store.subscribe(requestsTracker(store));
syncReduxAndRouter(history, store, (state) => state.router);

// Render the React application to the DOM
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
);
