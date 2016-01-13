import {
  findIndex,
  findLastIndex,
  last
} from 'lodash';
import shortid from 'shortid';

import {
  actionTypes,
  initialSith,
  maxSith
} from './constants';

const {
  ADD_APPRENTICE,
  ADD_MASTER,
  UPDATE_SITH,
  NAVIGATE_UP,
  NAVIGATE_DOWN
} = actionTypes;

function createSith (id, rank) {
  const type = rank === 'master' ? ADD_MASTER : ADD_APPRENTICE;
  const ref = shortid.generate();

  return {
    type,
    props: {
      id,
      ref,
      loading: false,
      loaded: false,
      error: false
    }
  };
}

export function updateSith (ref, props) {
  return {
    type: UPDATE_SITH,
    ref,
    props
  };
}

// Replaces a placeholder element with a
// loading version of a real record
export function replaceSith (id, rank) {
  return (dispatch, getState) => {
    const state = getState().sith;
    const isMaster = rank === 'master';
    const index = isMaster
        ? findIndex(state, sith => sith.id)
        : findLastIndex(state, sith => sith.id);

    if (index !== -1 && index !== 0 && index !== state.length - 1) {
      const next = isMaster ? index - 1 : index + 1;

      dispatch(
        updateSith(
          state[next].ref,
          { id }
        )
      );
    }
  };
}

export function fetchSithList () {
  return (dispatch, getState) => {
    const initialList = [
      createSith(initialSith, 'master'),
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
    const { sith } = getState();
    const master = sith[0].master;

    if (master && master.id) {
       // Remove last two sith
      dispatch({ type: NAVIGATE_UP });

      // Add a master using the master.id from the first sith
      dispatch(
        createSith(
          master.id,
          'master'
          )
        );

      // Add a placeholder master
      dispatch(
        createSith(
          undefined,
          'master'
        )
      );
    }
  };
}

export function navigateDown () {
  return (dispatch, getState) => {
    const { sith } = getState();
    const apprentice = last(sith).apprentice;

    if (apprentice && apprentice.id) {
      // Remove last two sith
      dispatch({ type: NAVIGATE_DOWN });

      // Add an apprentive using the apprentice.id from the last sith
      dispatch(
        createSith(
          apprentice.id,
          'apprentice'
        )
      );

      // Add a placeholder apprentice
      dispatch(
        createSith(
          undefined,
          'apprentice'
        )
      );
    }
  };
}
