import { combineReducers } from 'redux';
import { routeReducer as router } from 'redux-simple-router';
import { requestsReducer as requests } from 'redux-requests';

import location from 'pods/location/reducers';
import sith from 'pods/sith/reducers';

export default combineReducers({
  router,
  requests,
  location,
  sith
});
