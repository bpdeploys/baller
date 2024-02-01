import React from 'react';
import styles from './singlestat.module.scss';

const StatsItem = ({ label, value, img }) => (
  <div className={styles.statsItem}>
    <div>
      {img && (
        <img
          src={'/assets/imgs/svgs/dimitriProfilePlaceholder.svg'}
          alt="Stat Image"
          width={35}
          height={35}
        />
      )}
      <span className={styles.label}>{label}</span>
    </div>
    <span className={styles.value}>{value}</span>
  </div>
);

export default StatsItem;
