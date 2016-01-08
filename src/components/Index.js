import { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import styles from '../styles/core.scss';
import PlanetMonitor from 'components/PlanetMonitor';

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
            <ul className={styles.cssSlots}>
              <li className={styles.cssSlot}>
                <h3>Jorak Uln</h3>
                <h6>Homeworld: Korriban</h6>
              </li>
              <li className={styles.cssSlot}>
                <h3>Skere Kaan</h3>
                <h6>Homeworld: Coruscant</h6>
              </li>
              <li className={styles.cssSlot}>
                <h3>Na'daz</h3>
                <h6>Homeworld: Ryloth</h6>
              </li>
              <li className={styles.cssSlot}>
                <h3>Kas'im</h3>
                <h6>Homeworld: Nal Hutta</h6>
              </li>
              <li className={styles.cssSlot}>
                <h3>Darth Bane</h3>
                <h6>Homeworld: Apatros</h6>
              </li>
            </ul>

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
