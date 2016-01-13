import request from 'superagent';
import { difference } from 'lodash';

import {
  updateSith,
  replaceSith
} from './actions';

export default function (store) {
  const requests = {};

  return () => {
    const { dispatch } = store;
    const { sith } = store.getState();
    const unloadedSith = sith.filter(entity => entity.id && !(entity.loading || entity.loaded));

    // First need to cancel all requests for sith not in the current state
    const currentSithRefs = sith.map(entity => entity.ref);
    const currentLoadingSithRefs = Object.keys(requests);
    const unneededRequestRefs = difference(currentLoadingSithRefs, currentSithRefs);
    console.log(requests);
    unneededRequestRefs.forEach(ref => {
      requests[ref].abort();
      delete requests[ref];
    });

    unloadedSith.forEach(entity => {
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
  };
}
