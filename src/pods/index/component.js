import { Component, PropTypes } from 'react';
import styles from './styles.scss';
import LocationMonitor from 'pods/location/components/Monitor';
import SithList from 'pods/sith/components/List';

export default class Index extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    sith: PropTypes.array.isRequired,
    actions: PropTypes.shape({
      fetchSith: PropTypes.func.isRequired,
      navigateUp: PropTypes.func.isRequired,
      navigateDown: PropTypes.func.isRequired
    })
  };

  componentWillMount () {
    const { fetchSith } = this.props.actions;

    fetchSith();
  }

  render () {
    const {
      location,
      sith,
      actions
    } = this.props;
    const {
      navigateUp,
      navigateDown
    } = actions;

    return (
      <div className={styles.appContainer}>
        <div className={styles.cssRoot}>
          <LocationMonitor location={location.name} />

          <section className={styles.cssScrollableList}>
            <SithList entities={sith} />

            <div className={styles.cssScrollButtons}>
              <button
                onClick={() => navigateUp()}
                className={styles.cssButtonUp}
              />
              <button
                onClick={() => navigateDown()}
                className={styles.cssButtonDown}
              />
            </div>
          </section>
        </div>
      </div>
    );
  }
}
