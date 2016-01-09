import request from 'superagent';

import { actionTypes, firstSith } from './constants';
const {
  ADD_SITH,
  UPDATE_SITH
} = actionTypes;

// On initial load we find the first sith using the constant
// After we recursively find apprentices until we have 5 entities
// We also have a sister action for finding master

export function fetchSith () {
  const id = firstSith;

  return (dispatch, getState) => {
    dispatch(addSith(id));

    return findRecord(id).then((record, err) => {
      if (err) {
        console.log(`Could not fetch the sith with id ${id}`);
        console.log(err);

        return dispatch(updateSith(id, {
          error: err
        }));
      } else {
        findApprentice(dispatch, getState, record.apprentice.id);

        return dispatch(updateSith(id, record));
      }
    });
  };
}

function addSith (id) {
  return {
    type: ADD_SITH,
    id
  };
}

function updateSith (id, props) {
  return {
    type: UPDATE_SITH,
    id,
    props
  };
}

// This function is recursive and contiues until
// We have 5 current visible sith
function findApprentice (dispatch, getState, id) {
  const { sith } = getState();
  const willBreak = sith.length === 4;

  dispatch(addSith(id));

  return findRecord(id).then((record, err) => {
    if (err) {
      console.log(`Could not fetch the sith with id ${id}`);
      console.log(err);

      return dispatch(updateSith(id, {
        error: err
      }));
    } else {
      if (!willBreak && record.apprentice) {
        // findApprentice(dispatch, getState, record.apprentice.id);
      }

      return dispatch(updateSith(id, record));
    }
  });
}

function findMaster () {

}

function findRecord (id) {
  const url = `http://localhost:3000/dark-jedis/${id}`;

  return new Promise((resolve, reject) => {
    request
      .get(url)
      .end((err, response) =>
        err ? reject(err) : resolve(response.body)
      );
  });
}
