import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  fetchSithList,
  navigateUp,
  navigateDown
} from 'pods/sith/actions';
import IndexComponent from './component';

function mapStateToProps (state) {
  const {
    location,
    sith
  } = state;

  return {
    location,
    sith
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchSithList,
    navigateUp,
    navigateDown
  }, dispatch);
}

function mergeProps (stateProps, dispatchProps) {
  return Object.assign({}, stateProps, {
    actions: {
      ...dispatchProps
    }
  });
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(IndexComponent);
