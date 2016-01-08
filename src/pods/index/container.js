import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import IndexComponent from './component';

function mapStateToProps (state) {
  const { location } = state;

  return {
    location
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
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
