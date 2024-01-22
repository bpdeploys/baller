import React from 'react';
import styles from './leagueselectionbox.module.scss';

function LeagueSelectionBox({
  selected,
  league,
  onClick,
  isAnyLeagueSelected,
}) {
  const leagueProviderSelectClasses = `${styles.mainContainer} ${
    selected ? styles.selected : ''
  }`;

  const joinButtonClasses = `${styles.joinButton} ${
    selected
      ? styles.joinButtonSelected
      : isAnyLeagueSelected
      ? styles.joinButtonDisabled
      : styles.joinButtonNotSelected
  }`;

  return (
    <div className={leagueProviderSelectClasses} onClick={onClick}>
      <div className={styles.mainHeader}>
        <h3>{league?.league_name}</h3>
        <h4>Men's league</h4>
      </div>
      <div className={styles.content}>
        <p className={styles.teamCount}>
          Teams in league: {league?.teams_in_league?.length}
        </p>
        <p className={styles.kickOff}>
          Start date: {league?.season?.begin_date}
        </p>
      </div>
      <button
        className={joinButtonClasses}
        disabled={isAnyLeagueSelected && !selected}
      >
        {selected ? 'Joined' : 'Join League'}
      </button>
      <div className={styles.bpChampLeague}>BP Champions League</div>
    </div>
  );
}

export default LeagueSelectionBox;
