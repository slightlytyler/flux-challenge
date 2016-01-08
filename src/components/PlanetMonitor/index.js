import { Component, PropTypes } from 'react';
import styles from './styles.scss';

export default class PlanetMonitor extends Component {
  static propTypes = {
    planet: PropTypes.string
  };

  render () {
    const { planet } = this.props;

    return (
      <h1 className={styles.base}>
        { planet
          ? `Obi-Wan currently on ${planet}`
          : `Obi-Wan's location is unknown` }
      </h1>
    );
  }
}
