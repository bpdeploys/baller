// Styles
import styles from './sportselect.module.scss';
import Link from 'next/link';
import { abbreviatePosition } from '../../../utils/functions';
import positionsData from '../../../utils/data/positions.json';

const getPlayingPositionById = (id) => {
  const position = positionsData.find((p) => p.id === id);
  return position ? position.abbreviated : null;
};

/**
 * Squad teammate info component
 *
 * @param {array} data An array of codes with their assigned players to display in the table
 * @param {boolean} empty Whether or not the element should be empty
 *@param {boolean} disabled Whether or not the element should be disabled
 *
 * @returns {React.Element} A Squad teammate info element
 */
const SquadPlayer = ({ data, empty, disabled }) => {
  const playingPosition = getPlayingPositionById(
    parseInt(data?.playingPosition)
  );

  return empty ? (
    <Link href={disabled ? '/create_squad' : '/create_teammate'}>
      <div
        className={styles.squadPlayer}
        style={{
          filter: disabled ? 'blur(2px)' : 'none',
        }}
      >
        <div className={styles.squadPlayer__imageWrapper}>
          <img
            width={70}
            height={80}
            src="/assets/imgs/svgs/gray-shirt.svg"
            alt="Gray Player Shirt"
          />
        </div>
        <small>{data?.lastName}</small>
        <h3>{data?.firstName}</h3>
      </div>
    </Link>
  ) : (
    <div className={styles.squadPlayer}>
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
            playingPosition === 'GK'
              ? styles.playingPositionGk
              : styles.playingPosition
          }
        >
          {playingPosition}
        </span>
      </div>
      <small>{data?.lastName}</small>
      <h3>{data.firstName}</h3>
    </div>
  );
};

export default SquadPlayer;
