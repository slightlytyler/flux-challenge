import { Route, IndexRoute } from 'react-router';

import IndexComponent from 'components/index';

export default (
  <Route path='/'>
    <IndexRoute component={IndexComponent} />
  </Route>
);
