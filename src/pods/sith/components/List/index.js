import { Component, PropTypes } from 'react';
import styles from './styles.scss';

export default class SithList extends Component {
  static propTypes = {
    entities: PropTypes.array
  };

  renderItem (id, name, homeworld) {
    return (
      <li
        key={id}
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
    const { entities } = this.props;
    const { renderItem, renderEmpty } = this;

    return (
      <ul className={styles.list}>
        {
          entities.length !== 0
          ? entities.map(item => {
            const id = item.id;
            const name = item.name || '';
            const homeworld = item.homeworld ? item.homeworld.name : '';

            return renderItem(id, name, homeworld);
          })
          : renderEmpty()
        }
      </ul>
    );
  }
}
