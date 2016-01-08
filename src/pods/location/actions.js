import { actionTypes } from 'pods/location/constants';
const { SET_LOCATION } = actionTypes;

export function setLocation (payload) {
  return {
    type: SET_LOCATION,
    payload
  };
}
