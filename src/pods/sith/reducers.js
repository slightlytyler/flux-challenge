import { actionTypes } from './constants';
const { FETCH_SITH } = actionTypes;

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_SITH:
      return action.payload;
  }

  return state;
}
