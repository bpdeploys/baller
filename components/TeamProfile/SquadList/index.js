import { useState } from 'react';
import styles from './taglist.module.scss';
import Button from '../../Common/Button';

const StatsItem = ({ label, value, img, status, captain }) => (
  <div className={styles.playerItem}>
    <div>
      {img && (
        <img
          src={'/assets/imgs/pngs/playerimg.png'}
          alt="Stat Image"
          width={35}
          height={35}
        />
      )}
      <span className={styles.label}>{label}</span>
      {captain && (
        <img
          src="/assets/imgs/svgs/captainIcon.svg"
          alt="View team profile link"
        />
      )}
    </div>
    <div className={styles.itemWrapper}>
      <span className={status === 'verified' ? styles.done : styles.pending}>
        {status === 'verified' ? value : 'Not yet redeemed'}
      </span>
    </div>
  </div>
);

const SquadList = ({
  teamName,
  players,
  style,
  playersQuantity,
  notRedeemedPlayersCount,
}) => {
  return (
    <div className={styles.squadList} style={style}>
      <div className={styles.title}>
        <h3>{teamName} Squad</h3>
        <span>
          {playersQuantity} players | {notRedeemedPlayersCount} NOT REDEEMED
        </span>
      </div>
      {players.map((player) => (
        <StatsItem
          key={player.name}
          label={player.name}
          value={player.position}
          status={player.status}
          captain={player.captain}
          img
        />
      ))}
      <Button text="Edit Squad" color="blue" onClick={() => {}} />
    </div>
  );
};

export default SquadList;
