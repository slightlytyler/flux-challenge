import { combineReducers } from 'redux';
import { routeReducer as router } from 'redux-simple-router';

function location (state = {}, action) {
  switch (action.type) {
    case 'OBI_WAN_LOCATION_CHANGE':
      return action.payload;
  }

  return state;
}

export default combineReducers({
  router,
  location: location
});
