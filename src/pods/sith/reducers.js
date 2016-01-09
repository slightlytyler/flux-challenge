import { drop, dropRight } from 'lodash';

import { actionTypes } from './constants';
const {
  ADD_APPRENTICE,
  ADD_MASTER,
  UPDATE_SITH,
  NAVIGATE_UP,
  NAVIGATE_DOWN
} = actionTypes;

export default function (state = [], action) {
  switch (action.type) {
    case ADD_APPRENTICE:
      return [...state, { id: action.id }];

    case ADD_MASTER:
      return [{ id: action.id }, ...state];

    case UPDATE_SITH:
      return state.map(entity =>
        entity.id === action.id
        ? Object.assign({}, entity, action.props)
        : entity
      );

    case NAVIGATE_UP:
      return dropRight(state, 2);

    case NAVIGATE_DOWN:
      return drop(state, 2);
  }

  return state;
}
