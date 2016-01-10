import request from 'superagent';
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
  const id = firstSith;

  return (dispatch, getState) => {
    dispatch(addMaster(id));

    return findRecord(id).then((record, err) => {
      if (err) {
        console.log(`Could not fetch the sith with id ${id}`);
        console.log(err);

        return dispatch(updateSith(id, {
          error: err
        }));
      } else {
        const { master, apprentice } = record;

        if (master.id) {
          addSith('master', dispatch, getState, master.id);
        }

        if (apprentice.id) {
          addSith('apprentice', dispatch, getState, apprentice.id);
        }

        return dispatch(updateSith(id, record));
      }
    });
  };
}

// Recursive function that continues adding masters / apprentices
// as long as we have less than the max sith
function addSith (target, dispatch, getState, id) {
  const { sith } = getState();
  const cancel = sith.length === maxSith;

  if (!cancel) {
    const action = target === 'master' ? addMaster : addApprentice;

    dispatch(action(id));

    return findRecord(id).then((record, err) => {
      if (err) {
        console.log(`Could not fetch the sith with id ${id}`);
        console.log(err);

        return dispatch(updateSith(id, {
          error: err
        }));
      } else {
        const targetId = record[target].id;

        if (targetId) {
          addSith(target, dispatch, getState, targetId);
        }

        return dispatch(updateSith(id, record));
      }
    });
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
