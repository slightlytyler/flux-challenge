import { actionTypes } from './constants';
const { SET_LOCATION } = actionTypes;

export function setLocation (payload) {
  return {
    type: SET_LOCATION,
    payload
  };
}
