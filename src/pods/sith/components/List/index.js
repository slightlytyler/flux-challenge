import { Component, PropTypes } from 'react';
import styles from './styles.scss';

import Item from '../Item';
import EmptyItem from '../Item/Empty';

export default class SithList extends Component {
  static propTypes = {
    entities: PropTypes.array,
    currentLocation: PropTypes.string
  };

  render () {
    const {
      entities,
      currentLocation
    } = this.props;

    return (
      <ul className={styles.list}>
        {
          entities.length !== 0
          ? entities.map(item => {
            const ref = item.ref;
            const name = item.name || '';
            const homeworld = item.homeworld ? item.homeworld.name : '';

            return (
              <Item
                key={ref}
                name={name}
                homeworld={homeworld}
                active={homeworld === currentLocation}
              />
            );
          })
          : <EmptyItem />
        }
      </ul>
    );
  }
}
