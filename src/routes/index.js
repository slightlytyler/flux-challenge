import { Route, IndexRoute } from 'react-router';

import IndexComponent from 'pods/index/component';

export default (
  <Route path='/'>
    <IndexRoute component={IndexComponent} />
  </Route>
);
