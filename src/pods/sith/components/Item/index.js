import { Component, PropTypes } from 'react';
import Radium from 'radium';

import styles from './styles.scss';

@Radium
export default class SithItem extends Component {
  static propTypes = {
    name: PropTypes.string,
    homeworld: PropTypes.string,
    active: PropTypes.bool
  };

  render () {
    const {
      name,
      homeworld,
      active
    } = this.props;

    return (
      <li
        className={styles.item}
        style={[active && inlineStyles.active]}
      >
        <h3>{name}</h3>
        <h6>{homeworld}</h6>
      </li>
    );
  }
}

const inlineStyles = {
  active: {
    color: 'red'
  }
};
