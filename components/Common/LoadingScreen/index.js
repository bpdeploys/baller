import React from 'react';
import styles from './loading.module.scss';

const ScreenLoading = ({ height }) => {
  return (
    <div className={styles.screenLoading} style={{ height }}>
      <img
        src="/assets/imgs/svgs/homeLogo.svg"
        alt="Baller Logo"
        className={styles.logo}
      />
      <div className={styles.ldsRing}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default ScreenLoading;
