import React from 'react';
import styles from './statsdisplay.module.scss'; // make sure to create this SCSS module

const Stat = ({ title, value }) => (
  <div className={styles.stat}>
    <div className={styles.title}>{title}</div>
    <div className={styles.value}>{value}</div>
  </div>
);

const StatsDisplay = ({ stats }) => {
  return (
    <div className={styles.statsDisplay}>
      {stats.map((stat, index) => (
        <>
          <Stat key={stat.title} title={stat.title} value={stat.value} />
          {index < stats.length - 1 && <div className={styles.divider}></div>}
        </>
      ))}
    </div>
  );
};

export default StatsDisplay;