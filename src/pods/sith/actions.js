import { actionTypes } from './constants';
const { FETCH_SITH } = actionTypes;

export function fetchSith (id) {
  return {
    type: FETCH_SITH,
    id
  }
}