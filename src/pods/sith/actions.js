import request from 'superagent';

import { actionTypes } from './constants';
const { FETCH_SITH } = actionTypes;

export function fetchSith (id) {
  const url = `http://localhost:3000/dark-jedis/${id}`;

  return (dispatch) => {
    dispatch({
      type: FETCH_SITH,
      id
    });

    return request
      .get(url)
      .end((err, res) => {
        if (err) {
          return dispatch({
            type: 'SET_SITH',
            error: err
          });
        } else {
          return dispatch({
            type: 'SET_SITH',
            entity: res.body
          });
        }
      })
    ;
  };
}
