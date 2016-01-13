import { Component } from 'react';

import styles from '../styles.scss';

export default class SithEmptyItem extends Component {
  render () {
    return (
      <li className={styles.item}>
        <h3>Fetching data...</h3>
      </li>
    );
  }
}
