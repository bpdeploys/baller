import styles from './livematch.module.scss';

const LiveMatch = ({ active = false, onClick }) => {
  return (
    <div className={styles.liveMatch}>
      <h4>Live Match</h4>
      <div className={styles.card}>
        <div className={styles.league}>
          <img src="/assets/imgs/svgs/powerleague.svg" alt="League logo" />
        </div>
        <span className={styles.liveTag}>Live Match</span>
        <div className={styles.content}>
          <div className={styles.teams}>
            <div>
              <span>2</span>
              <small>Arsenal</small>
            </div>
            <div>
              <span>3</span>
              <small>Chelsea</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMatch;
