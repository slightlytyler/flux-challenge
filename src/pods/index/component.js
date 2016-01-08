import { Component, PropTypes } from 'react';
import styles from './styles.scss';
import LocationMonitor from 'pods/location/components/Monitor';
import SithList from 'pods/sith/components/List';

export default class Index extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  };

  componentWillMount () {
    console.log('test');
  }

  render () {
    const { location } = this.props;

    return (
      <div className={styles.appContainer}>
        <div className={styles.cssRoot}>
          <LocationMonitor location={location.name} />

          <section className={styles.cssScrollableList}>
            <SithList entities={[
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
