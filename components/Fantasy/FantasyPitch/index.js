import React from 'react';
import styles from './fantasypitch.module.scss';

const FantasyPitch = ({ children }) => {
  return (
    <div className={styles.fantasyPitch}>
      <img
        className={styles.pitch}
        src="/assets/imgs/svgs/fantasyPitch.svg"
        alt="Pitch"
      />
      {children}
    </div>
  );
};

export default FantasyPitch;
