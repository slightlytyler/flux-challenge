import { Component } from 'react';
import styles from '../styles/core.scss'

export default class Index extends Component {
  render () {
    return (
      <div className={styles.appContainer}>
        <div className={styles.cssRoot}>
          <h1 className={styles.cssPlanetMonitor}>Obi-Wan currently on Tatooine</h1>

          <section className={styles.cssScrollableList}>
            <ul className={styles.cssSlots}>
              <li className={styles.cssSlot}>
                <h3>Jorak Uln</h3>
                <h6>Homeworld: Korriban</h6>
              </li>
              <li className={styles.cssSlot}>
                <h3>Skere Kaan</h3>
                <h6>Homeworld: Coruscant</h6>
              </li>
              <li className={styles.cssSlot}>
                <h3>Na'daz</h3>
                <h6>Homeworld: Ryloth</h6>
              </li>
              <li className={styles.cssSlot}>
                <h3>Kas'im</h3>
                <h6>Homeworld: Nal Hutta</h6>
              </li>
              <li className={styles.cssSlot}>
                <h3>Darth Bane</h3>
                <h6>Homeworld: Apatros</h6>
              </li>
            </ul>

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
