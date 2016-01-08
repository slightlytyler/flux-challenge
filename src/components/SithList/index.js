import { Component, PropTypes } from 'react';
import styles from './styles.scss';

export default class SithList extends Component {
  static propTypes = {
    list: PropTypes.array
  };

  renderItem (name, homeworld) {
    return (
      <li
        key={name}
        className={styles.item}
      >
        <h3>{name}</h3>
        <h6>{homeworld}</h6>
      </li>
    );
  }

  renderEmpty () {
    return (
      <li className={styles.item}>
        <h3>Fetching data...</h3>
      </li>
    );
  }
  render () {
    const { list } = this.props;
    const { renderItem, renderEmpty } = this;

    return (
      <ul className={styles.list}>
        {
          list.length !== 0
          ? list.map(item => renderItem(item.name, item.homeworld))
          : renderEmpty()
        }
      </ul>
    );
  }
}
