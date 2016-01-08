import { actionTypes } from './constants';
const { SET_SITH } = actionTypes;

export default function (state = [], action) {
  switch (action.type) {
    case SET_SITH:
      return [action.entity];
  }

  return state;
}
