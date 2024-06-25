import React from 'react';
import styles from './fantasyplayer.module.scss';
import { abbreviatePlayerName } from '../../../utils/functions';

const FantasyPlayer = ({ position, selectedPlayer, onSelect, onDeselect }) => {
  const positionClass = styles[position.toLowerCase()];

  return (
    <div
      className={`${positionClass} ${styles.fantasyPlayer}`}
      onClick={() =>
        selectedPlayer ? onDeselect(position) : onSelect(position)
      }
    >
      {selectedPlayer && (
        <img
          className={styles.selected}
          src="/assets/imgs/pngs/playerimg.png"
          alt="Fantasy Player"
        />
      )}
      <img src="/assets/imgs/svgs/fantasyPlayer.svg" alt="Fantasy Player" />
      <span>
        {selectedPlayer ? abbreviatePlayerName(selectedPlayer.name) : position}
      </span>
    </div>
  );
};

export default FantasyPlayer;
