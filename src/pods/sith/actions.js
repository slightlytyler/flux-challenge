import request from 'superagent';

import { actionTypes } from './constants';
const { FETCH_SITH, SET_SITH } = actionTypes;

export function fetchSith (id) {
  return (dispatch) => {
    dispatch({
      type: FETCH_SITH,
      id
    });

    return findRecord(id).then((response, err) => {
      if (err) {
        console.log(`Could not fetch the sith with id ${id}`);
        console.log(err);

        return dispatch({
          type: SET_SITH,
          error: err
        });
      } else {
        return dispatch({
          type: SET_SITH,
          entity: response.body
        });
      }
    });
  };
}

function findRecord (id) {
  const url = `http://localhost:3000/dark-jedis/${id}`;

  return new Promise((resolve, reject) => {
    request
      .get(url)
      .end((err, response) =>
        err ? reject(err) : resolve(response)
      );
  });
}
