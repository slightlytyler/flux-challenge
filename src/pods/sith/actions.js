import request from 'superagent';
import { attemptRequest } from 'redux-requests';
import { last } from 'lodash';
import {
  actionTypes,
  firstSith,
  maxSith
} from './constants';

const {
  ADD_APPRENTICE,
  ADD_MASTER,
  UPDATE_SITH,
  NAVIGATE_UP,
  NAVIGATE_DOWN
} = actionTypes;

// The base action creators
function addApprentice (id) {
  return {
    type: ADD_APPRENTICE,
    id
  };
}

function addMaster (id) {
  return {
    type: ADD_MASTER,
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

// The initial action creator
// Fetches the first sith and then begins fetching master and apprentices
export function fetchSith () {
  return (dispatch, getState) => {
    const id = firstSith;
    const url = `http://localhost:3000/dark-jedis/${id}`;

    attemptRequest(url, {
      begin: () => addMaster(id),
      success: response => {
        const { master, apprentice } = response;

        if (master.id) {
          addSith('master', dispatch, getState, master.id);
        }

        if (apprentice.id) {
          addSith('apprentice', dispatch, getState, apprentice.id);
        }

        return updateSith(id, response);
      },
      failure: error => {
        console.log(`Could not fetch the sith with id ${id}`);
        console.log(error);

        return updateSith(id, {
          error
        });
      }
    }, () => findRecord(url)
    , dispatch);
  };
}

// Recursive function that continues adding masters / apprentices
// as long as we have less than the max sith
function addSith (target, dispatch, getState, id) {
  const { sith } = getState();
  const cancel = sith.length === maxSith;

  if (!cancel) {
    const url = `http://localhost:3000/dark-jedis/${id}`;
    const action = target === 'master' ? addMaster : addApprentice;

    attemptRequest(url, {
      begin: () => action(id),
      success: response => {
        const targetRecord = response[target];

        if (targetRecord.id) {
          addSith(target, dispatch, getState, targetRecord.id);
        }

        return updateSith(id, response);
      },
      failure: error => {
        console.log(`Could not fetch the sith with id ${id}`);
        console.log(error);

        return updateSith(id, {
          error
        });
      }
    }, () => findRecord(url)
    , dispatch);
  }
}

export function navigateUp () {
  return (dispatch, getState) => {
    const { sith } = getState();
    const firstSith = sith[0];
    const master = firstSith.master && firstSith.master.id;

    if (master) {
      dispatch({ type: NAVIGATE_UP });

      return addSith('master', dispatch, getState, master);
    }
  };
}

export function navigateDown () {
  return (dispatch, getState) => {
    const { sith } = getState();
    const lastSith = last(sith);
    const apprentice = lastSith.apprentice && lastSith.apprentice.id;

    if (apprentice) {
      dispatch({ type: NAVIGATE_DOWN });

      return addSith('apprentice', dispatch, getState, apprentice);
    }
  };
}

function findRecord (url) {
  return new Promise((resolve, reject) => {
    request
      .get(url)
      .end((err, response) =>
        err ? reject(err) : resolve(response.body)
      );
  });
}
