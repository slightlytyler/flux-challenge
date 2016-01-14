import { createSelector } from 'reselect'
import { locationSelector } from 'pods/location/selectors';

export const sithSelector = state => state.sith;

export const currentSithHomeworlds = createSelector(
  sithSelector,
  sith => sith.map(entity => entity.homeworld && entity.homeworld.name)
);

export const anySithBornInCurrentLocation = createSelector(
  currentSithHomeworlds,
  locationSelector,
  (currentSithHomeworlds, location) => location && currentSithHomeworlds.indexOf(location.name) !== -1
);

export const unloadedSith = createSelector(
  sithSelector,
  sith => sith.filter(entity => entity.id && !(entity.loading || entity.loaded))
);

export const sithRefs = createSelector(
  sithSelector,
  sith => sith.map(entity => entity.ref)
);