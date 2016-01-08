import { Route, IndexRoute } from 'react-router';

import IndexContainer from 'pods/index/container';

export default (
  <Route path='/'>
    <IndexRoute component={IndexContainer} />
  </Route>
);
