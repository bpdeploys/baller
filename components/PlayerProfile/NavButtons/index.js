import styles from './navbuttons.module.scss';

const ProfileNavButtons = ({ activeTab, onTabChange }) => {
  return (
    <div className={styles.navButtons}>
      <button
        onClick={() => onTabChange('stats')}
        className={`${styles.navButton} ${
          activeTab === 'stats' ? styles.navButtonActive : ''
        }`}
      >
        Stats
      </button>
      <button
        onClick={() => onTabChange('overview')}
        className={`${styles.navButton} ${
          activeTab === 'overview' ? styles.navButtonActive : ''
        }`}
      >
        Overview
      </button>
    </div>
  );
};

export default ProfileNavButtons;
