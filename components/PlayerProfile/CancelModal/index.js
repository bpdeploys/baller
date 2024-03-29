import styles from './cancelmodal.module.scss'; // Import the SCSS module

const CancelModal = ({ player, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <svg
          width="390"
          height="143"
          viewBox="0 0 390 143"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-80 0C61.668 13.3184 146.517 14.2471 291.644 19.3012L242.035 59.1464C298.218 71.6852 398 79.8031 398 79.8031V143C275.501 137.514 200.991 127.718 65.232 99.5058L127.744 71.6852C36.5134 58.2748 6.2107 48.9806 -79.9989 38.9736L-80 0Z"
            fill="#B60A0A"
          />
          <path
            d="M-80 0C61.668 13.3184 146.517 14.2471 291.644 19.3012L242.035 59.1464C298.218 71.6852 398 79.8031 398 79.8031V143C275.501 137.514 200.991 127.718 65.232 99.5058L127.744 71.6852C36.5134 58.2748 6.2107 48.9806 -79.9989 38.9736L-80 0Z"
            fill="#1361A9"
            fill-opacity="0.04"
          />
        </svg>

        <div className={styles.content}>
          <h3>Ahh man!!!</h3>
          <p>How come you can't make it?</p>
          <button className={styles.points} onClick={() => onClose()}>
            5 points 😞
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;
