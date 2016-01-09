import { actionTypes } from './constants';
const {
  ADD_SITH,
  UPDATE_SITH
} = actionTypes;

export default function (state = [], action) {
  switch (action.type) {
    case ADD_SITH:
      return [...state, { id: action.id }];

    case UPDATE_SITH:
      return state.map(entity =>
        entity.id === action.id
        ? Object.assign({}, entity, action.props)
        : entity
      );
  }

  return state;
}
