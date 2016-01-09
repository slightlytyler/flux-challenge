import { actionTypes } from './constants';
const {
  ADD_APPRENTICE,
  ADD_MASTER,
  UPDATE_SITH
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
  }

  return state;
}
