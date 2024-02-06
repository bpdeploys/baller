import { useState } from 'react';
import styles from './statslist.module.scss';

const StatsItem = ({ label, value }) => (
  <div className={styles.statsItem}>
    <span className={styles.label}>{label}</span>
    <span className={styles.value}>{value}</span>
  </div>
);

const StatsList = ({
  title,
  matchStatistics,
  teamsPlayed,
  topScorers,
  style,
}) => {
  const [viewMore, setViewMore] = useState(false);

  return (
    <div className={styles.statsList} style={style}>
      <h3 className={styles.title}>Stats</h3>
      <div className={styles.stats}>
        {matchStatistics.map((statistic) => (
          <StatsItem
            key={statistic.stat}
            label={statistic.stat}
            value={statistic.value}
          />
        ))}
        {viewMore && (
          <>
            <h3 className={styles.insideTitle}>List of teams played</h3>
            {teamsPlayed.map((team) => (
              <StatsItem
                key={team.team}
                label={team.team}
                value={team.timesPlayed}
              />
            ))}
            <h3 className={styles.insideTitle}>Teams Top Scorers</h3>
            {topScorers.map((scorer) => (
              <StatsItem
                key={scorer.player}
                label={scorer.player}
                value={scorer.goals}
              />
            ))}
          </>
        )}

        <div className={styles.button} onClick={() => setViewMore(!viewMore)}>
          {viewMore ? 'Collapse Stats' : 'View Stats'}
          <img
            src="/assets/imgs/svgs/blueLinkArrow.svg"
            alt="View team profile link"
          />
        </div>
      </div>
    </div>
  );
};

export default StatsList;
