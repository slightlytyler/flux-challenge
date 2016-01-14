import request from 'superagent';
import { difference, forEach, size } from 'lodash';

import {
  updateSith,
  replaceSith
} from './actions';
import {
  anySithBornInCurrentLocation,
  unloadedSith,
  sithRefs
} from './selectors';

export default function (store) {
  const requests = {};

  return () => {
    const { dispatch } = store;
    const state = store.getState();
    const { sith } = state;

    if (size(requests) > 0 && anySithBornInCurrentLocation(state)) {
      forEach(requests, (value, ref) => {
        value.abort();
        delete requests[ref];

        dispatch(updateSith(ref, {
          loading: false,
          loaded: false,
          error: false
        }));
      });
    } else {
      // First need to cancel all requests for sith not in the current state
      const unneededRequestRefs = difference(Object.keys(requests), sithRefs(state));

      unneededRequestRefs.forEach(ref => {
        requests[ref].abort();
        delete requests[ref];

        dispatch(updateSith(ref, {
          loading: false,
          loaded: false,
          error: false
        }));
      });

      unloadedSith(state).forEach(entity => {
        dispatch(updateSith(entity.ref, {
          loading: true,
          loaded: false,
          error: false
        }));

        let url = `http://localhost:3000/dark-jedis/${entity.id}`;

        requests[entity.ref] = request
          .get(url)
          .end((error, response) => {
            if (response) {
              delete requests[entity.ref];

              dispatch(
                updateSith(
                  entity.ref,
                  Object.assign({}, response.body, {
                    loading: false,
                    loaded: true,
                    error: false
                  })
                )
              );

              const { master, apprentice } = response.body;

              if (master && master.id && !sith.some(entity => entity.id === master.id)) {
                dispatch(replaceSith(master.id, 'master'));
              }

              if (apprentice && apprentice.id && !sith.some(entity => entity.id === apprentice.id)) {
                dispatch(replaceSith(apprentice.id, 'apprentice'));
              }
            } else if (error) {
              console.log(error);

              dispatch(
                updateSith(
                  entity.ref,
                  {
                    loading: false,
                    loaded: false,
                    error
                  }
                )
              );
            }
          })
        ;
      });
    }
  };
}
