import { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import styles from '../styles/core.scss';
import PlanetMonitor from 'components/PlanetMonitor';
import SithList from 'components/SithList';

class Index extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  };

  render () {
    const { location } = this.props;

    return (
      <div className={styles.appContainer}>
        <div className={styles.cssRoot}>
          <PlanetMonitor planet={location.name} />

          <section className={styles.cssScrollableList}>
            <SithList list={[
              {
                name: 'Some sith',
                homeworld: 'Some homeworld'
              }
            ]} />

            <div className={styles.cssScrollButtons}>
              <button className={styles.cssButtonUp}></button>
              <button className={styles.cssButtonDown}></button>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    location: state.location
  };
}

export default connect(mapStateToProps)(Index);
