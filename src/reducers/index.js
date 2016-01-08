import { combineReducers } from 'redux';
import { routeReducer as router } from 'redux-simple-router';

import location from 'pods/location/reducers';

export default combineReducers({
  router,
  location
});
