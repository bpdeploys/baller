import { useState } from 'react';
import styles from './pointslist.module.scss';

const InfoItem = ({ label, value }) => (
  <div className={styles.infoItem}>
    <div>
      <span className={styles.label}>{label}</span>
    </div>
    <div className={styles.points}>
      <span className={styles.value}>{value}</span>
      <img
        src="/assets/imgs/svgs/blueLinkArrow.svg"
        alt="View team profile link"
      />
    </div>
  </div>
);

const PlayerInfo = ({ title, info, style }) => {
  return (
    <div className={styles.playerInfo} style={style}>
      {info.map((stat) => (
        <InfoItem key={stat.label} label={stat.label} value={stat.value} />
      ))}
    </div>
  );
};

export default PlayerInfo;
