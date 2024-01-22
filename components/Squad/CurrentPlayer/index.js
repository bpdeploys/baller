// Styles
import styles from './sportselect.module.scss';

/**
 * Squad teammate info component
 *
 * @param {array} data An array of codes with their assigned players to display in the table
 * @param {boolean} empty Whether or not the element should be empty
 *
 * @returns {React.Element} A Squad teammate info element
 */
const CurrentPlayer = ({ data, onClick, captain }) => {
  return (
    <div className={styles.squadPlayer} onClick={onClick}>
      <div className={styles.squadPlayer__imageWrapper}>
        <img
          width={70}
          height={80}
          src="/assets/imgs/svgs/blue-shirt.svg"
          alt={data?.id || 'Blue Player Shirt'}
        />
        <span className={styles.squadNumber}>{data?.squadNumber}</span>
        <span
          className={
            data?.playingPosition === 'GK'
              ? styles.playingPositionGk
              : styles.playingPosition
          }
        >
          F{/* {abbreviatePosition(data?.playingPosition)} */}
        </span>
        {captain && <span className={styles.playingPositionCap}>C</span>}
      </div>
      <small>{data?.lastName || 'Last name'}</small>
      <h3>{data?.firstName || 'First name'}</h3>
    </div>
  );
};

export default CurrentPlayer;
