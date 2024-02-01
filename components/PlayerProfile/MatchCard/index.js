import React from 'react';
import styles from './matchcard.module.scss'; // make sure to create this SCSS module

const MatchCard = ({ match }) => {
  return (
    <div className={styles.matchCard}>
      <div className={styles.matchInfo}>
        <div className={styles.matchVs}>
          <span>VS</span> {match.opponent}
        </div>
        <div className={styles.matchDate}>{match.date}</div>
        <div className={styles.matchType}>
          <span className={styles.typeLabel}>{match.type}</span>
          {match.competition === 'Up' ? (
            <img src="/assets/imgs/svgs/arrowUpRed.svg" alt="Up competition" />
          ) : match.competition === 'Down' ? (
            <img
              src="/assets/imgs/svgs/arrowDownGreen.svg"
              alt="Down competition"
            />
          ) : (
            <img
              src="/assets/imgs/svgs/neutralOrange.svg"
              alt="neutral competition"
            />
          )}
        </div>
      </div>
      <button className={styles.reportButton}>View Match Report</button>
    </div>
  );
};

export default MatchCard;
