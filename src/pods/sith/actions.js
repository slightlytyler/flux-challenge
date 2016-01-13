import request from 'superagent';
import {
  findIndex,
  findLastIndex
} from 'lodash';
import shortid from 'shortid';

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

// Creates the sith record using ID (optional) / rank (for positioning)
// If ID is defined, we fetch the record, otherwise don't
// On success we fetch the appretnice / master records if they are not loaded / loading
function createSith (id, rank) {
  return (dispatch, getState) => {
    const actionType = rank === 'master' ? ADD_MASTER : ADD_APPRENTICE;
    const ref = shortid.generate();
    const newSith = () => ({
      type: actionType,
      props: {
        id,
        ref,
        loading: true,
        loaded: false,
        error: false
      }
    });

    dispatch(newSith());

    if (id) {
      fetchSith(id, dispatch, getState);
    }
  };
}

function updateSith (ref, props) {
  return {
    type: UPDATE_SITH,
    ref,
    props
  };
}

// Replaces a placeholder element with a
// loading version of a real record
function replaceSith (id, rank) {
  return (dispatch, getState) => {
    const state = getState().sith;
    const isMaster = rank === 'master';
    const index = isMaster
        ? findIndex(state, sith => sith.id)
        : findLastIndex(state, sith => sith.id);

    if (index !== -1 && index !== 0 && index !== state.length - 1) {
      const next = isMaster ? index - 1 : index + 1;

      dispatch(updateSith(state[next].ref, {
        id,
        props: {}
      }));

      dispatch(fetchSith(id, dispatch, getState));
    }
  };
}

function fetchSith (id, dispatch, getState) {
  const url = `http://localhost:3000/dark-jedis/${id}`;

  return findRecord(url).then((response, error) => {
    if (error) {
      console.log(error);

      dispatch(updateSith(id, {
        loading: false,
        loaded: false,
        error
      }));
    } else {
      const { sith } = getState();
      const currentSith = sith.find(sith => sith.id === id);

      dispatch(updateSith(currentSith.ref, Object.assign({}, response, {
        loading: false,
        loaded: true,
        error: false
      })));

      const { master, apprentice } = response;

      if (master && master.id) {
        // Update next blank master element
        dispatch(replaceSith(master.id, 'master'));
      }

      if (apprentice && apprentice.id) {
        // Update next blank apprentice element
        dispatch(replaceSith(apprentice.id, 'apprentice'));
      }
    }
  });
}

export function fetchSithList () {
  return (dispatch, getState) => {
    const initialList = [
      createSith(firstSith, 'master'),
      createSith(undefined, 'apprentice'),
      createSith(undefined, 'apprentice'),
      createSith(undefined, 'master'),
      createSith(undefined, 'master')
    ];

    initialList.forEach(action => dispatch(action));
  };
}

export function navigateUp () {
  return (dispatch, getState) => {
   // const { sith } = getState();
   // const firstSith = sith[0];
   // const master = firstSith.master && firstSith.master.id;

   // if (master) {
   //   dispatch({ type: NAVIGATE_UP });
   //   addSith('master', dispatch, getState, master);
   //   return addSith('master', dispatch, getState);
   // }
  };
}

export function navigateDown () {
  return (dispatch, getState) => {
   // const { sith } = getState();
   // const lastSith = last(sith);
   // const apprentice = lastSith.apprentice && lastSith.apprentice.id;

   // if (apprentice) {
   //   dispatch({ type: NAVIGATE_DOWN });

   //   return addSith('apprentice', dispatch, getState, apprentice);
   // }
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
