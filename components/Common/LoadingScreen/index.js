import React from 'react';
import PropTypes from 'prop-types';
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

ScreenLoading.defaultProps = {
  height: '100vh',
};

ScreenLoading.propTypes = {
  height: PropTypes.string,
};

export default ScreenLoading;
