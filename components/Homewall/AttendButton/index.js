import styles from './attendButton.module.scss';

const AttendButton = ({ onClick }) => {
  return (
    <div className={styles.attendButton}>
      <button className={styles.button} onClick={onClick}>
        5 points 🔥
      </button>
    </div>
  );
};

export default AttendButton;
