import { Component, PropTypes } from 'react';
import Radium from 'radium';
import { last } from 'lodash';

import styles from './styles.scss';
import LocationMonitor from 'pods/location/components/Monitor';
import SithList from 'pods/sith/components/List';

@Radium
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
    const firstSith = sith[0];
    const lastSith = last(sith);
    const navigateUpDisabled = !firstSith || !firstSith.master || !firstSith.master.id;
    const navigateDownDisabled = !lastSith || !lastSith.apprentice || !lastSith.apprentice.id;

    return (
      <div className={styles.appContainer}>
        <div className={styles.cssRoot}>
          <LocationMonitor location={location.name} />

          <section className={styles.cssScrollableList}>
            <SithList entities={sith} />

            <div className={styles.cssScrollButtons}>
              <button
                onClick={() => navigateUp()}
                style={[
                  radiumStyles.button.base,
                  radiumStyles.button.up,
                  navigateUpDisabled && radiumStyles.button.disabled
                ]}
              >
                &uArr;
              </button>
              <button
                onClick={() => navigateDown()}
                style={[
                  radiumStyles.button.base,
                  radiumStyles.button.down,
                  navigateDownDisabled && radiumStyles.button.disabled
                ]}
              >
                &dArr;
              </button>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

const radiumStyles = {
  button: {
    base: {
      flex: 1,
      color: '#69F0D2',
      fontSize: '30px',
      textShadow: '0px 0px 10px #69F0D2',
      background: '#39697A',
      border: '5px solid #69F0D2',
      borderRadius: '2px',
      boxShadow: '0px 0px 10px 1px #69F0D2, inset 0px 0px 10px 1px #69F0D2'
    },

    up: {
    },

    down: {
      marginTop: '7px'
    },

    disabled: {
      opacity: '0.5',
      pointerEvents: 'none'
    }
  }
};
