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
      return [...state, action.props];

    case ADD_MASTER:
      return [action.props, ...state];

    case UPDATE_SITH:
      return updateSith(state, action.id, action.props);

    case NAVIGATE_UP:
      return dropRight(state, 2);

    case NAVIGATE_DOWN:
      return drop(state, 2);
  }

  return state;
}

function updateSith(state, id, props) {
  return state.map(entity =>
    entity.id === id
    ? Object.assign({}, entity, props)
    : entity
  );
}