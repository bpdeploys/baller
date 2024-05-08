import Link from 'next/link';
import styles from './keymatch.module.scss';

const KeyMatch = ({ active = false, onClick }) => {
  return (
    <div className={styles.keyMatch}>
      <h4>Key Match</h4>
      <div className={styles.card}>
        <span className={styles.date}>19/12/1997</span>
        {active && (
          <div className={styles.league}>
            <img src="/assets/imgs/svgs/powerleague.svg" alt="League logo" />
          </div>
        )}
        <div className={styles.content}>
          <div className={styles.teams}>
            <span>Arsenal</span>
            <span>VS</span>
            <span>Chelsea</span>
          </div>
          <button
            onClick={onClick}
            className={active ? styles.active : styles.normal}
          >
            Top of the League Matchup
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeyMatch;
