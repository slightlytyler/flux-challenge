import { Component, PropTypes } from 'react';
import styles from './styles.scss';

export default class LocationMonitor extends Component {
  static propTypes = {
    location: PropTypes.string
  };

  render () {
    const { location } = this.props;

    return (
      <h1 className={styles.base}>
        { location
          ? `Obi-Wan currently on ${location}`
          : `Obi-Wan's location is unknown` }
      </h1>
    );
  }
}
