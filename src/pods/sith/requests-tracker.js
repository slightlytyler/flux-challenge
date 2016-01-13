import request from 'superagent';

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

    unloadedSith.forEach(entity => {
      dispatch(updateSith(entity.ref, {
        loading: true,
        loaded: false,
        error: false
      }));

      findRecord(entity.id).then((response, error) => {
        if (response) {
          dispatch(
            updateSith(
              entity.ref,
              Object.assign({}, response, {
                loading: false,
                loaded: true,
                error: false
              })
            )
          );

          const { master, apprentice } = response;

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
      });
    });
  };
}

function findRecord (id) {
  const url = `http://localhost:3000/dark-jedis/${id}`;

  return new Promise((resolve, reject) => {
    request
      .get(url)
      .end((err, response) =>
        err ? reject(err) : resolve(response.body)
      )
    ;
  });
}
