import React from 'react';
import styles from './playerselectionmodal.module.scss';

const PlayerSelectionModal = ({
  players,
  position,
  onPlayerSelect,
  onClose,
}) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Select a {position}</h2>
        <ul>
          {players?.map((player) => (
            <li
              key={player.id}
              onClick={() => {
                onPlayerSelect(position, player);
                onClose();
              }}
            >
              {player.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlayerSelectionModal;
