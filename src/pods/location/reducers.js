import { actionTypes } from 'pods/location/constants';
const { SET_LOCATION } = actionTypes;

export default function (state = {}, action) {
  switch (action.type) {
    case SET_LOCATION:
      return action.payload;
  }

  return state;
}
